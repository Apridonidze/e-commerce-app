const ValidateSocketToken = require("../config/ValidateSocketToken");

function chatSocket (io) {

    io.use(ValidateSocketToken)

    io.on('connection', (socket) => {
        console.log('asd')
    })

}

module.exports = chatSocket;