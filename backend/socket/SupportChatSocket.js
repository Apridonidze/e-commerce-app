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

        if(!token) return;//return error message

        console.log('Token received:', token);
        const user = ValidateSocketToken(token)
        console.log(user)
        //get users cookies from connection 
        //add middleware to validate user cookies
        
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