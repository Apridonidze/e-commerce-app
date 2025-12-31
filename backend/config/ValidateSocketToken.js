const jwt = require('jsonwebtoken')
require('dotenv').config()


function ValidateSocketToken (next, socket) {
    try{

        const authHeaders = socket.handshake.headers['authorization']
        if(!authHeaders) return (next('Invalid Headers'))

        const token = authHeaders.split(' ')[1]
        const validatedToken = jwt.verify(token , process.env.JWT_SECRET_KEY)

        socket.user = validatedToken
        next();

    }catch(err){
        next(console.log(err))
    }
}


module.exports = ValidateSocketToken