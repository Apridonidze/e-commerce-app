const db = require('../config/db')

async function handleConvLoad (user, ws) {
    try{

        const [roomsQuery] = await db.query('select admin.rooms from admin where id = ?',[user.userId])
        const myRooms = roomsQuery.filter((r) => r.rooms !== null)
        const filteredRooms = myRooms.map(r => {return JSON.parse(r.rooms)}).flat()

        if(myRooms.length < 1) ws.send(JSON.stringify({type : 'recieve_conv_ids' , rooms : []}))
        
        const [rooms] = await db.query('SELECT users.fullname, support_messages.content, support_messages.created_at,support_messages.conversation_id  FROM support_messages join users on users.id = support_messages.sender_id  WHERE conversation_id IN (?) order by message_id desc limit 1',[filteredRooms]);
        ws.send(JSON.stringify({type: "recieve_conv_ids" , rooms : rooms}))

        return true;

    }catch(err){
        ws.send(JSON.stringify({type: 'internal_error' , message : "Error While Fetching Clients Messages"}))
        ws.close()
        return false;
    }
}

module.exports = handleConvLoad