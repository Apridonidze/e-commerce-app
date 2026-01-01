const jwt = require('jsonwebtoken')
const cookie = require('cookie')
require('dotenv').config()


function ValidateSocketToken (socket,next) {
    try{

        const authHeaders = socket.handshake.headers.cookie;
        const cookies = authHeaders.split('=')[1]
        
        if(!authHeaders) return next(new Error({errMessage : "Invalid Headers"}))

        const validatedToken = jwt.verify(cookies , process.env.JWT_SECRET_KEY)

        socket.user = validatedToken
        next();

    }catch(err){
        
        return next(new Error({errMessage : "Invalid Token", err : err}))
    }
}


module.exports = ValidateSocketToken