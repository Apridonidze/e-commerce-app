const db = require('../../utils/db'); //importing db utilty

async function handleRooms (user , ws) {
    try{

        const [ roomsQuery ] = await db.query('select admin.rooms from admin where id = ?',[user.userId]); //fetcing rooms from db for my admin user
        const myRooms = roomsQuery.filter((r) => r.rooms !== null); //filtering rooms from empty data
        const filteredRooms = myRooms.map(r => {return JSON.parse(r.rooms)}).flat(); //convering room into json array

        if(filteredRooms.length === 0){ //checking if filteredRooms.length === 0 and executing logic
            ws.send(JSON.stringify({type : 'recieve_conv_ids' , rooms : []})); //returning  empty rooms array
            return true; //exporting true status from middleware
        };

        const [ rooms ] = await db.query('SELECT users.fullname, support_messages.content, support_messages.created_at,support_messages.conversation_id, support_messages.status, support_messages.sender_id FROM support_messages join users on users.id = support_messages.sender_id  WHERE conversation_id IN (?) order by message_id desc limit 1',[filteredRooms]); // if we have nonempty room. then we fetch data from this rooms to display on sidebar in adminrooms
        
        const formatedRooms = rooms.map((room) => ({
            fullname: room.fullname,
            content:  room.content,
            created_at:  room.created_at,
            conversation_id:  room.conversation_id,
            status:  room.status,
            sender_id:  room.sender_id === ws.user.userId ? "You" : room.fullname
        })); //formatting last message for sidebar

        ws.send(JSON.stringify({type: "recieve_conv_ids" , rooms : formatedRooms})); //returning formated rooms array

        return true; //exporting true status from middleware

    }catch(err){
        ws.send(JSON.stringify({type: 'internal_error' , message : "Error While Fetching Clients Messages"})); //sending error message
        ws.close(); //closing connection
        return false; //exporting false status
    };
};

module.exports = handleRooms; //exporting middleware