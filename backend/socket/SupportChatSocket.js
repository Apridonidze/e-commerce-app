const url  = require('url');
const { WebSocketServer } = require('ws');

const ValidateSocketToken = require('../config/ValidateSocketToken');
const db = require('../config/db')

const { v4: uuid } = require('uuid')

require('dotenv').config();


function SupportChatSocket (server) {
    
    const wss = new WebSocketServer({ server })
    
    wss.on("connection" , async(ws, req) => {
        console.log('SupportChatSocket initialized');
        const query = url.parse(req.url, true).query;
        const token = query.token;

        const validatedUser = ValidateSocketToken(token , ws)
        if(!validatedUser) return;
        
        
        //check users role , if its admin add them to adminlist and send to frotnedn , else return (avoid duplicates)
        //if user is admin do not assign convid to them
        
        try{

            const [ convId ] = await db.query('select support_messages.conversation_id, support_messages.sender_id from support_messages join users on support_messages.sender_id = users.id where sender_id = ? ' , [ws.user.userId])
            
            if(convId.length > 0){
                ws.convId = uuid(2)
            }; 
            ws.convId = convId[0].conversation_id
            const [prevMessages] = await db.query('select support_messages.sender_id , support_messages.content, support_messages.created_at from support_messages join users on support_messages.sender_id = users.id where support_messages.conversation_id  = ? ORDER BY support_messages.message_id DESC LIMIT 15' , [ws.convId])

            ws.send(JSON.stringify({type: 'recieve_convid' , convId : ws.convId}))
            ws.send(JSON.stringify({type : "recieve_support_chat_message" , message : prevMessages}))
                    

        }catch(err){
            ws.send(JSON.stringify({type: 'internal_error' , message : err}))
        }
        
        
        

        ws.on('message' , async(data) => {

            //validate message
            const message = JSON.parse(data.toString())

            if(message.type ==  'support_chat_message'){

                //validate message if now valid send error message
                //if not validated return ws.send(JSON.stringify({type : 'internal_error' , status : false ,message : "Message Sent Failed"}))
                try{

                    await db.query('insert into support_messages (conversation_id, sender_id , content) values (?,?,?)', [message.convId , ws.user.userId , message.text])
                    ws.send(JSON.stringify({type : 'message_status' , status : true ,message : "Message Sent Successfully"}))

                    const [prevMessages] = await db.query('select support_messages.sender_id , support_messages.content, support_messages.created_at from support_messages join users on support_messages.sender_id = users.id where support_messages.conversation_id  = ? ORDER BY support_messages.message_id DESC LIMIT 15' , [ws.convId])
                    ws.send(JSON.stringify({type : "recieve_support_chat_message" , message : prevMessages}))
                    
                }catch(err){
                    ws.send(JSON.stringify({type : 'internal_error' , status : false ,message : "Message Sent Failed"}))
                }
            }
            
        })

        ws.on('close', () => {
            console.log('WebSocket client disconnected');
            //check ws , if ws user id is admin remove from list else return
            //check which user disconnected, if its admin modify adminList by removing admin id from list
        });
    })

}

module.exports = SupportChatSocket