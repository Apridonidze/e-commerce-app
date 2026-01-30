const db = require('../config/db')

async function handleRooms (user , ws) {
    try{

        const [roomsQuery] = await db.query('select admin.rooms from admin where id = ?',[user.userId])
        const myRooms = roomsQuery.filter((r) => r.rooms !== null)
        const filteredRooms = myRooms.map(r => {return JSON.parse(r.rooms)}).flat()

        if(myRooms.length < 1) ws.send(JSON.stringify({type : 'recieve_conv_ids' , rooms : []}))            

        const [rooms] = await db.query('SELECT users.fullname, support_messages.content, support_messages.created_at,support_messages.conversation_id, support_messages.status, support_messages.sender_id FROM support_messages join users on users.id = support_messages.sender_id  WHERE conversation_id IN (?) order by message_id desc limit 1',[filteredRooms]);
        const formatedRooms = rooms.map((room) => ({
            fullname: room.fullname,
            content:  room.content,
            created_at:  room.created_at,
            conversation_id:  room.conversation_id,
            status:  room.status,
            sender_id:  room.sender_id === ws.user.userId ? "You" : room.fullname
        }))
        ws.send(JSON.stringify({type: "recieve_conv_ids" , rooms : formatedRooms}))

        return true;

    }catch(err){
        ws.send(JSON.stringify({type: 'internal_error' , message : "Error While Fetching Clients Messages"}))
        ws.close()
        return false;
    }
}


module.exports = handleRooms