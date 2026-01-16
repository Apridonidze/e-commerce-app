const url  = require('url');
const { WebSocketServer } = require('ws');

const ValidateSocketToken = require('../config/ValidateSocketToken');
const db = require('../config/db')

const { v4: uuid } = require('uuid')

require('dotenv').config();

const rooms = []
const adminList = []

function SupportChatSocket (server) {
    
    const wss = new WebSocketServer({ server })
    
    wss.on("connection" , async(ws, req) => {

        console.log('SupportChatSocket initialized');

        const query = url.parse(req.url, true).query;
        const token = query.token;
        const gainAdminAccess = query.gainAdminAccess

        //validate admin is gainAdminAccess is true
        //else it will be client so no need for this

        const validatedUser = ValidateSocketToken(token , ws)
        if(!validatedUser) return;

        try{

            const [ AdminList ] = await db.query('select admin.id from admin join users on admin.id = users.id where admin.id = ?',[ws.user.userId])
            
            if(AdminList.length > 0) {
                if(adminList.some(adm => adm === ws.user.userId)) adminList;
                else adminList.push(ws.user.userId)
            };

            ws.send(JSON.stringify({type: 'recieve_admin_list' , adminList : adminList}))

        }catch(err){
            ws.send(JSON.stringify({type: 'internal_error', message : err}))
        }

        //add anothjjer try catch block to get rooms for admin if message is sent and rooms does not contain empty message (admins must recieve this information once theyt are in admin-dashboard/admin-support-chat url)
        
        try{

            const [ convId ] = await db.query('select support_messages.conversation_id, support_messages.sender_id from support_messages join users on support_messages.sender_id = users.id where sender_id = ? ' , [ws.user.userId])
            
            if(convId.length === 0){ws.convId = uuid(2)}; 
            
            ws.convId = convId[0].conversation_id
            // add checking here if user is joinend to room already from ws.rooms if not return error, else return messages
            const [query] = await db.query('select support_messages.sender_id , support_messages.content, support_messages.created_at from support_messages join users on support_messages.sender_id = users.id where support_messages.conversation_id  = ? ORDER BY support_messages.message_id DESC LIMIT 15' , [ws.convId])
            const prevMessages = query.map(msg => ({
                sender_id : msg.sender_id,
                sender_name : msg.sender_id === ws.user.userId ? 'You' : 'Support',
                content : msg.content,
                created_at : msg.created_at,
            }))

            ws.send(JSON.stringify({type: 'recieve_convid' , convId : ws.convId}))
            ws.send(JSON.stringify({type : "recieve_support_chat_message" , message : prevMessages}))//add who is sender (you or other)
            
            if(!rooms.some(CI => CI === ws.convId)) rooms.push(ws.convId)
                
        }catch(err){
            ws.send(JSON.stringify({type : 'internal_error' ,message : "Message Recieve Failed", errMessage : err}))
        }
            
        ws.on('message' , async(data) => {

            const message = JSON.parse(data.toString())


            //validate message

            //check if user is joined to room , if so send message , else return error mesasge and rejoin user to room

            if(message.type ==  'support_chat_message'){

                //validate message if now valid send error message
                //if not validated return ws.send(JSON.stringify({type : 'internal_error' ,message : "Message Sent Failed"}))
                try{

                    await db.query('insert into support_messages (conversation_id, sender_id , content) values (?,?,?)', [message.convId , ws.user.userId , message.text])
                    ws.send(JSON.stringify({type : 'message_status' , status : true ,message : "Message Sent Successfully"}))

                    const [query] = await db.query('select support_messages.sender_id , support_messages.content, support_messages.created_at from support_messages join users on support_messages.sender_id = users.id where support_messages.conversation_id  = ? ORDER BY support_messages.message_id DESC LIMIT 15' , [ws.convId])
                    const prevMessages = query.map(msg => ({
                        sender_id : msg.sender_id,
                        sender_name : msg.sender_id === ws.user.userId ? 'You' : 'Support',
                        content : msg.content,
                        created_at : msg.created_at,
                    }))

                    ws.send(JSON.stringify({type : "recieve_support_chat_message" , message : prevMessages}))
                    
                }catch(err){
                    console.log(err)
                    ws.send(JSON.stringify({type : 'internal_error' ,message : "Message Sent Failed", errMessage : err}))
                }
              }

              
              //for admin add rooms joining by clicking one of the chats in support chat sidebar
              //send rooms to admin sidebar with convids so every user is displayed in sidebar
              //if new messsage appears that is not seen yet , display it as a New Message with seenders profile 
            
        })

        ws.on('close', () => {
            console.log('WebSocket client disconnected');

            //remove convId from roooms if one of the user disconnects from rooms

            rooms.filter(CI => CI !== ws.convId)
            adminList.filter(adm => adm !== ws.user.userId)

            ws.send(JSON.stringify({type: 'recieve_admin_list' , adminList : adminList}))
            //check which user disconnected, if its admin modify adminList by removing admin id from list
        });
    })

}

module.exports = SupportChatSocket