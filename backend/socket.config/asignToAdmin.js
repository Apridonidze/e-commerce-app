const clientRooms = require('../socket.config/rooms')

async function asignToAdmin (convId, ws) {

    // check if convid is in clientRooms , if it is avoid duplication if not insert into it
    try{
        //get all rooms that admins have, if it is assinged to any of them return, else check which admin has least ammount of conversations and give it to them, if all of them have same amount assign first one 
        return true
    }catch(err){
        return false
        //return error message via ws
        //close connection
    }
}


module.exports = asignToAdmin 