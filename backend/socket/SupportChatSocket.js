const url  = require('url');
const { WebSocketServer } = require('ws');

const ValidateSocketToken = require('../config/ValidateSocketToken');
const db = require('../config/db')

require('dotenv').config();


function SupportChatSocket (server) {
    
    const wss = new WebSocketServer({ server })
    
    wss.on("connection" , (ws, req) => {
        console.log('SupportChatSocket initialized');
        const query = url.parse(req.url, true).query;
        const token = query.token;

        const validatedUser = ValidateSocketToken(token , ws)
        if(!validatedUser) return;
        //check users role , if its admin add them to adminlist and send to frotnedn , else return (avoid duplicates)

        //generate convId before sending messages
        //join user to convId 

        //if its admin then after admin chooses your message


        ws.on('message' , async(data) => {
            const message = JSON.parse(data.toString())

            console.log(message)

            if(message.type ==  'support_chat_message'){
                try{

                    //validate message if now valid send error message
                    await db.query('insert into support_messages (conversation_id, sender_id , content) values (?,?,?)', [message.convId , ws.user.userId , message.text])
                    ws.send(JSON.stringify({type : 'message_status' , status : true ,message : "Message Sent Successfully"}))
                    
                }catch(err){
                    ws.send(JSON.stringify({type : 'internal_error' , status : false ,message : "Message Sent Failed"}))
                }
            }    
                    
//  const [prevMessages] = await db.query('select support_messages.sender_id , support_messages.content, support_messages.created_at from support_messages join users on support_messages.sender_id = users.id where support_messages.conversation_id  = ? ORDER BY support_messages.message_id DESC LIMIT 15' , [convId])
//                 ws.send(JSON.stringify({type : "recieve_support_chat_message" , message : }))


               
          
            

            //send error or success message with ws.send({JSON.strifingy})
            
        })

        ws.on('close', () => {
            console.log('WebSocket client disconnected');

            //check which user disconnected, if its admin modify adminList by removing admin id from list
        });
    })

}

module.exports = SupportChatSocket