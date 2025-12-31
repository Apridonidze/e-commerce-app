const ValidateToken = require("../config/ValidateToken");

function chatSocket (io) {

      io.on('connection', (socket) => {
        console.log('socket connected' )

      })

}

module.exports = chatSocket;