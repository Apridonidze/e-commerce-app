const jwt = require('jsonwebtoken')
require('dotenv').config()


function ValidateSocketToken (token) {
    try{

        if(!token) throw new Error('No Token Provided')
        
        const user = jwt.verify(token, process.env.JWT_SECRET_KEY)
        return user;

    }catch(err){
        throw new Error('Invalid Token')
    }
}


module.exports = ValidateSocketToken