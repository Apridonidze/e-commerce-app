const rooms = require('../socket.config/rooms')
const db = require('../config/db')

async function handleRooms (user , ws) {
    try{

        return true;
    }catch(err){
        console.log(err)
        return false;
        //close connection and return error
    } 
//check for rooms sizes , if > 0 then check admins support queues of support chats and give convid to admin that has least convids, (if all same give it to the first admin) then send this convid to admins that will be delivered to support chat sidebra (of admin support chat)
}


module.exports = handleRooms