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

        if(!ValidateSocketToken(token , ws))return ;
        
        //check users role , if its admin add them to adminlist and send to frotnedn , else return (avoid duplicates)



        //generate convId before sending messages
        //join user to convId 

        //if its admin then after admin chooses your message


        ws.on('message' , async(data) => {
            const message = JSON.parse(data.toString())
            //add message validation


            console.log(message)

            //check if message type is support_chat_message , if so trigger this event (with else if statemeent)
            //place queries into try/catch block
            //send error or success message with ws.send({JSON.strifingy})
            await db.query('insert into support_messages (conversation_id, sender_id , content) values (?,?,?)', [message.convId , ws.user.userId , message.text])
            console.log('message sent successfully')
        })

        ws.on('close', () => {
            console.log('WebSocket client disconnected');

            //check which user disconnected, if its admin modify adminList by removing admin id from list
        });
    })

}

module.exports = SupportChatSocket