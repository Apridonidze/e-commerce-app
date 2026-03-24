const jwt = require('jsonwebtoken')
require('dotenv').config()

function ValidateSocketToken (token, ws) {
    try{

        if(!token) {ws.send(JSON.stringify({type : "token_error" , message : "Invalid Token Format"})); return true}
        
        const user = jwt.verify(token, process.env.JWT_SECRET_KEY)
        if(!user) {ws.send(JSON.stringify({type : "token_error" , message : "Unverified Token"})); return false}
        
        ws.user = user
        return true;
    }catch(err){

        ws.send(JSON.stringify({type : "internal_error" , message : "Invalid Token Format"}))
        ws.close()
        return false;
    }
}


module.exports = ValidateSocketToken