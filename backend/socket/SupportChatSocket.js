const { WebSocketServer } = require('ws');

require('dotenv').config();


function SupportChatSocket (server) {
    
    const wss = new WebSocketServer({ server })
    
    wss.on("connection" , (ws) => {
        console.log('SupportChatSocket initialized');

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