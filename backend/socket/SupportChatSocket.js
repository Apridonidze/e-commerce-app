const { WebSocketServer } = require('ws');

require('dotenv').config();


function SupportChatSocket (server) {
    const wss = new WebSocketServer({server})

    wss.on("connection", (ws, req) => {
        console.log('socket connected')
    })

    return wss;
}

module.exports = SupportChatSocket