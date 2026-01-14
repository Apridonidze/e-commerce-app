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

        //generate convId before sending messages
        console.log(ws.user)
        
        //check users role , if its admin add them to adminlist and send to frotnedn , else return


        ws.on('message' , async(data) => {
            const message = JSON.parse(data.toString())
            await db.query('insert into support_messages (conversation_id, sender_id , content) values (?,?,?)', [message.convId , ws.user.userId , message.text])
            console.log('message sent successfully')
        })

        ws.on('close', () => {
            console.log('WebSocket client disconnected');
        });
    })

}

module.exports = SupportChatSocket