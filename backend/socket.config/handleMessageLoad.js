const db = require('../config/db')

async function handleMessageLoad (user, convId , ws) {

    try{
        const [query] = await db.query('select support_messages.sender_id , support_messages.content, support_messages.created_at from support_messages join users on support_messages.sender_id = users.id where support_messages.conversation_id  = ? ORDER BY support_messages.message_id DESC' , [convId])

        const prevMessages = query.map(msg => ({
                    sender_id : msg.sender_id,
                    sender_name : msg.sender_id === user.userId ? 'You' : 'Support',
                    content : msg.content,
                    created_at : msg.created_at,
        }))

        //check prevmessages length if length === 0 then return [] as a message

        ws.send(JSON.stringify({type : "recieve_support_chat_message" , message : prevMessages}))


        return true
    }catch(err){
        console.log(err)
        return false
    }
}


module.exports = handleMessageLoad