const handleMessageLoad = require('../socket.config/handleMessageLoad')

const db = require('../config/db')
const rooms = require('../ws.store/rooms')
const { v4: uuid } = require("uuid");

async function handleConvId (user ,ws) {
    try{

        const [ convId ] = await db.query('select support_messages.conversation_id, support_messages.sender_id from support_messages join users on support_messages.sender_id = users.id where sender_id = ? order by support_messages.message_id limit 1' , [user.userId])

        convId.length === 0 ? ws.convId = uuid().slice(0,8) : ws.convId = convId[0].conversation_id 

        if (!rooms.has(ws.convId)) {rooms.set(ws.convId, new Set());}
        rooms.get(ws.convId).add(ws);

        ws.send(JSON.stringify({type: 'recieve_convid' , convId : ws.convId}))

        const loadMessages = handleMessageLoad(user, ws.convId , ws)
        if(!loadMessages) return;
        
        return true

        }catch(err){
            console.log(err)
            ws.send(JSON.stringify({type : 'internal_error' ,message : "Message Recieve Failed", errMessage : err}))
            
            return false
        }
}

module.exports = handleConvId