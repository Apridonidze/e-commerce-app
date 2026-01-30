const rooms = require('../ws.store/rooms');
const handleMessageLoad = require('./handleMessageLoad');

function handleJoinConv (admin, convId ,ws) {

    if (!rooms.has(ws.convId)) {rooms.set(ws.convId, new Set());}
        rooms.get(ws.convId).add(ws);

    const loadMessages = handleMessageLoad(admin, convId , ws)
    if(!loadMessages)return;

}

module.exports = handleJoinConv;