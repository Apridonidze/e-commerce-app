const { WebSocketServer } = require('ws');

require('dotenv').config();


function SupportChatSocket (server) {
    
    const wss = new WebSocketServer({ server })
    
    wss.on("connection" , (ws) => {
        console.log('SupportChatSocket initialized');

        //add events here

        ws.on('close', () => {
            console.log('WebSocket client disconnected');
        });
    })

}

module.exports = SupportChatSocket