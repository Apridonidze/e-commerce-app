const db = require('../config/db')

async function handleMessageLoad (user, convId , ws) {

 
    try{

        const [query] = await db.query('select support_messages.sender_id , support_messages.content, support_messages.created_at from support_messages join users on support_messages.sender_id = users.id where support_messages.conversation_id  = ? ORDER BY support_messages.message_id DESC' , [convId])

        const message = query.map(msg => ({
                    sender_id : msg.sender_id,
                    sender_name : msg.sender_id === user.userId ? 'You' : 'Support',
                    content : msg.content,
                    created_at : msg.created_at,
        }))

        

        //check prevmessages length if length === 0 then return [] as a message



        // const clients = rooms.get(convId);
            
        // if (!clients) return;
        //     for (const client of clients) {
        //         if (client.readyState === client.OPEN) {client.send(JSON.stringify({type: 'receive_support_chat_message', message : message}))};
        //     }


        return true
    }catch(err){
        console.log(err)
        return false
    }
}


module.exports = handleMessageLoad