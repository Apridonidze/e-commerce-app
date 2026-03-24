const db = require('../../utils/db')
const rooms = require('../socket.stores/rooms')

async function handleMessageLoad (user, convId , ws) {

 
    try{

        const [query] = await db.query('select support_messages.sender_id , support_messages.content, support_messages.created_at, support_messages.status from support_messages join users on support_messages.sender_id = users.id where support_messages.conversation_id  = ? ORDER BY support_messages.message_id DESC' , [convId])

        const message = query.map(msg => ({
                    sender_id : msg.sender_id,
                    sender_name : msg.sender_id === user.userId ? 'You' : 'Support',
                    content : msg.content,
                    created_at : msg.created_at,
                    status : msg.sender_id === user.userId ? msg.status : 'Seen'
        })) || []

        const clients = rooms.get(convId);
            
        if (!clients) return;
            for (const client of clients) {
                if (client.readyState === client.OPEN) {client.send(JSON.stringify({type: 'receive_support_chat_message', message : message}))};
            }

        return true
    }catch(err){
        ws.send(JSON.stringify({type : 'internal_error' ,message : "Could Not Recieve Messages. Try Later"}))
        ws.close()
        return false
    }
}


module.exports = handleMessageLoad