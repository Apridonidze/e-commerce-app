const ValidateSocketToken = require("../config/ValidateSocketToken");

function chatSocket (io) {

    io.use(ValidateSocketToken)

    io.on('connection', (socket) => {
        socket.on('join' ,() => {
            console.log(socket.user)
        })
    })

}

module.exports = chatSocket;