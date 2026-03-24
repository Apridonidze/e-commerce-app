const db = require('../../utils/db'); //importing db utility
const rooms = require('../socket.stores/rooms'); //importing rooms object

async function handleMessageLoad (user, convId , ws) {
    try{

        const [query] = await db.query('select support_messages.sender_id , support_messages.content, support_messages.created_at, support_messages.status from support_messages join users on support_messages.sender_id = users.id where support_messages.conversation_id  = ? ORDER BY support_messages.message_id DESC' , [convId]); //fetching data from support_messages data

        const message = query.map(msg => ({
                    sender_id : msg.sender_id,
                    sender_name : msg.sender_id === user.userId ? 'You' : 'Support',
                    content : msg.content,
                    created_at : msg.created_at,
                    status : msg.sender_id === user.userId ? msg.status : 'Seen'
        })) || []; //formatting support chat messages based on who sent it and status of messages

        const clients = rooms.get(convId); //retrieving convId from rooms to check if client is online/offline
            
        if (!clients) return; //if user is offline retrieving supportchat messagges
            for (const client of clients) {
                if (client.readyState === client.OPEN) {client.send(JSON.stringify({type: 'receive_support_chat_message', message : message}))};
            };

        return true; //exporting true status from middleware
    }catch(err){
        ws.send(JSON.stringify({type : 'internal_error' ,message : "Could Not Recieve Messages. Try Later"})); //returning error message
        ws.close(); //closing websocket connection
        return false; //exporting false status from middleware
    };
};

module.exports = handleMessageLoad; //exporting middleware