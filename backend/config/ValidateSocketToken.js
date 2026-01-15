const jwt = require('jsonwebtoken')
require('dotenv').config()

function ValidateSocketToken (token, ws) {
    try{

        if(!token) {ws.send(JSON.stringify({type : "token_error" , message : "no token provided"})); return true}
        
        const user = jwt.verify(token, process.env.JWT_SECRET_KEY)
        if(!user) {ws.send(JSON.stringify({type : "token_error" , message : "unverified token"})); return false}
        
        ws.user = user
        return true;
    }catch(err){
        ws.send(JSON.stringify({type : "internal_error" , message : err}))
        return false;
    }
}


module.exports = ValidateSocketToken