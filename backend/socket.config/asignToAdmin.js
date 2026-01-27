const db = require('../config/db')

async function asignToAdmin (convId, ws) {

    try{
        //get all rooms that admins have, if it is assinged to any of them return, else check which admin has least ammount of conversations and give it to them, if all of them have same amount assign first one 

        console.log('new message' , convId)

        const [query] = await db.query('select admin.rooms from admin')
        const rooms = query.map((r) => {return JSON.parse(r.rooms)}).flat()
        if(rooms.includes(convId)) console.log('asdad')
        console.log('does not iclude')
        //if there is no rooms then send to first admin here
        // const [query] = await db.query('select support_messages.sender_id , support_messages.content, support_messages.created_at from support_messages join users on support_messages.sender_id = users.id where support_messages.conversation_id  = ? ORDER BY support_messages.message_id DESC' , [convId])

        return true
    }catch(err){
        return false
        //return error message via ws
        //close connection
    }
}


module.exports = asignToAdmin 