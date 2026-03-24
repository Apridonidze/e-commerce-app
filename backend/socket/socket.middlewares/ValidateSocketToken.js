require('dotenv').config(); //importing env file

const jwt = require('jsonwebtoken'); //importing jwt library

function ValidateSocketToken (token, ws) {
    try{

        if(!token) {ws.send(JSON.stringify({type : "token_error" , message : "Invalid Token Format"})); return true}; //checking if token is providen and if not returning error message
        
        const user = jwt.verify(token, process.env.JWT_SECRET_KEY); //verifing user token
        if(!user) {ws.send(JSON.stringify({type : "token_error" , message : "Unverified Token"})); return false}; //returning error message if token verification fails
        
        ws.user = user; //defining ws.user to use users id easiliy in websocket middlewares
        return true;//exporting true status from middleware

    }catch(err){

        ws.send(JSON.stringify({type : "internal_error" , message : "Invalid Token Format"})); //returning error message
        ws.close(); //closing connection
        return false; //exporting false status from middleware
    };
};

module.exports = ValidateSocketToken; //exporting middleware