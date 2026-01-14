const { WebSocketServer } = require('ws');
const url  = require('url');
const ValidateSocketToken = require('../config/ValidateSocketToken');

require('dotenv').config();


function SupportChatSocket (server) {
    
    const wss = new WebSocketServer({ server })
    
    wss.on("connection" , (ws, req) => {
        console.log('SupportChatSocket initialized');
        const query = url.parse(req.url, true).query;
        const token = query.token;

        if(!ValidateSocketToken('asdasd' , ws))return ;
        
        //check users role , if its admin add them to adminlist and send to frotnedn , else return


        ws.on('message' , (data) => {
            const message = JSON.parse(data.toString())
            console.log(message)
        })

        ws.on('close', () => {
            console.log('WebSocket client disconnected');
        });
    })

}

module.exports = SupportChatSocket