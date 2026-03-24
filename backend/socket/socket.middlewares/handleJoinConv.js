const rooms = require('../socket.stores/rooms'); //importing rooms object
const handleMessageLoad = require('./handleMessageLoad'); //importing middleware

function handleJoinConv (admin, convId ,ws) {

    if (!rooms.has(ws.convId)) {rooms.set(ws.convId, new Set());} //checking if user does not have conversation in rooms object and inserting id in it if so
        rooms.get(ws.convId).add(ws); //else if user has conversation id in rooms object returniong conversation id

    const loadMessages = handleMessageLoad(admin, convId , ws); //passing data to middleware to load messages
    if(!loadMessages)return; //returning empty function if loadmessages return false status

};

module.exports = handleJoinConv;//exporting middleware