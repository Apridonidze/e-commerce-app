const url  = require('url');
const { WebSocketServer } = require('ws');

const ValidateSocketToken = require('../socket.config/ValidateSocketToken');
const ValidateSocketAdmin = require('../socket.config/ValidateSocketAdmin')
const db = require('../config/db')

const { v4: uuid } = require("uuid");
const handleMessageLoad = require('../socket.config/handleMessageLoad');
const handleAdminRooms = require('../socket.config/handleAdminRooms');
const handleConvLoad = require('../socket.config/handleConvLoad');

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

        const validatedUser = ValidateSocketToken(token , ws)
        if(!validatedUser) return;

        if(gainAdminAccess){
            
            const validateAdmin = ValidateSocketAdmin(ws.user , ws , adminList)
            if(!validateAdmin)return;
            
            const loadConvIds = handleConvLoad(ws.user, ws)
            if(!loadConvIds) return;
        }
        
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


        try{

            const [ convId ] = await db.query('select support_messages.conversation_id, support_messages.sender_id from support_messages join users on support_messages.sender_id = users.id where sender_id = ? order by support_messages.message_id limit 1' , [ws.user.userId])
            

            convId.length === 0 ? ws.convId = uuid().slice(0,8) : ws.convId = convId[0].conversation_id 
                    
            ws.send(JSON.stringify({type: 'recieve_convid' , convId : ws.convId}))

            const loadMessages = handleMessageLoad(ws.user, ws.convId , ws)
            if(!loadMessages) return;
            
        }catch(err){
            console.log(err)
            ws.send(JSON.stringify({type : 'internal_error' ,message : "Message Recieve Failed", errMessage : err}))
        }
            
        ws.on('message' , async(data) => {

            const message = JSON.parse(data.toString())


            if(message.type ==  'support_chat_message'){

                //validate message if now valid send error message
                //if not validated return ws.send(JSON.stringify({type : 'internal_error' ,message : "Message Sent Failed"}))
                try{

                    await db.query('insert into support_messages (conversation_id, sender_id , content) values (?,?,?)', [message.convId , ws.user.userId , message.text])
                    ws.send(JSON.stringify({type : 'message_status' , status : true ,message : "Message Sent Successfully"}))

                    if(!rooms.some(CI => CI === ws.convId)) rooms.push(ws.convId)

                    const loadMessages = handleMessageLoad(ws.user, ws.convId , ws)
                    if(!loadMessages) return;
                    
                    ws.send(JSON.stringify({type : "recieve_support_chat_message" , message : loadMessages}))

                    console.log('message recieved')

                    // const assingToAdmin = handleAdminRooms(ws.user , ws)
                }catch(err){
                    //close connection
                    console.log(err) //remove in future
                    ws.send(JSON.stringify({type : 'internal_error' ,message : "Message Sent Failed"}))
                }
              }
        })

        ws.on('close', () => {
            console.log('WebSocket client disconnected');

            rooms.filter(CI => CI !== ws.convId)
            adminList.filter(adm => adm !== ws.user.userId)

            ws.send(JSON.stringify({type: 'recieve_admin_list' , adminList : adminList}))
        });
    })
}

module.exports = SupportChatSocket