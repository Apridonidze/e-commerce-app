const db = require('../config/db')
const onlineAdmins = require('../ws.store/onlineAdmins')

async function asignToAdmin (convId, ws) {

    try{
        
        console.log(onlineAdmins)

        const [query] = await db.query('select admin.rooms from admin')
        const rooms = query.map(r => JSON.parse(r.rooms)?.rooms || []).flat();

        if(rooms.includes(convId)){return}
        
        rooms.push(convId)    
        await db.query(`UPDATE admin SET rooms = JSON_ARRAY() WHERE rooms IS NULL;`)
        await db.query(`UPDATE admin SET rooms = JSON_ARRAY_APPEND(rooms, "$", ?) WHERE id = 1 AND NOT JSON_CONTAINS(rooms, JSON_QUOTE(?))`, [convId, convId]);

        //if there is no rooms then send to first admin here
        // const [query] = await db.query('select support_messages.sender_id , support_messages.content, support_messages.created_at from support_messages join users on support_messages.sender_id = users.id where support_messages.conversation_id  = ? ORDER BY support_messages.message_id DESC' , [convId])

        return true
    }catch(err){
        console.log
        return false
        //return error message via ws   
        //close connection
    }
}


module.exports = asignToAdmin 