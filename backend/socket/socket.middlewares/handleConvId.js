const db = require('../../utils/db'); //imporrting db utility
const rooms = require('../socket.stores/rooms'); //importing rooms object
const handleMessageLoad = require('./handleMessageLoad'); //importing middleware

const { v4: uuid } = require("uuid"); //importing uuid to generate random id

async function handleConvId (user ,ws) {
    try{

        const [ convId ] = await db.query('select support_messages.conversation_id, support_messages.sender_id from support_messages join users on support_messages.sender_id = users.id where sender_id = ? order by support_messages.message_id limit 1' , [user.userId]); //fetching conversation data from db

        convId.length === 0 ? ws.convId = uuid().slice(0,8) : ws.convId = convId[0].conversation_id; //creating new conversation id if user does not have any

        if (!rooms.has(ws.convId)) rooms.set(ws.convId, new Set()); //inserting conversation in roooms object if its not included
        rooms.get(ws.convId).add(ws); //getting conversation id from roooms

        ws.send(JSON.stringify({type: 'recieve_convid' , convId : ws.convId})); //returning conversation id

        const loadMessages = handleMessageLoad(user, ws.convId , ws); //passing user, conversation id and ws to another middleware to load messages
        if(!loadMessages) return; //returning nothing if users have no messages in supportchat
        
        return true; //returning ture status from middleware

        }catch(err){
            ws.send(JSON.stringify({type : 'internal_error' ,message : "Could Not Generate Conversation Id. Try Later"})); //returnign error message
            ws.close(); //closing web socket connection
            return false; //returning false status from middleware
        };
};

module.exports = handleConvId;//exporting middleware