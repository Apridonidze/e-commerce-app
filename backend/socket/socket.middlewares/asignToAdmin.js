const db = require('../../utils/db'); //importing db utility
const onlineAdmins = require('../socket.stores/onlineAdmins'); //importing online admins objects

async function asignToAdmin(convId, ws) {
    try {
        const onlineAdminsArr = Array.from(onlineAdmins.keys()); //converting object into array

        if (onlineAdminsArr.length === 0) return ws.send(JSON.stringify({type: 'no_online_admins',message: "Could Not Find Available Admin. Try Later"})); //returning error message if no admin is online
        
        const [rows] = await db.query(`select id, rooms from admin where id in (?)`,[onlineAdminsArr]); //selecting admins and their assigned rooms

        let selectedAdmin = null; //defining targetAdmin to asign conversation to
        let minRooms = Infinity; //definign minimum room count that asigned admins can have

        for (const admin of rows) {
            const parsed = admin.rooms ? JSON.parse(admin.rooms) : []; //admin.rooms array
            const count = parsed.length; //selecting rooms count for each admin

            if (count < minRooms) { //if admin rooms are less than min room count then new conversation is assigned to that admin
                minRooms = count;
                selectedAdmin = admin;
            };
        };

        if (!selectedAdmin) return false; //returning false message if we could not select admin

        const currentRooms = selectedAdmin.rooms ? JSON.parse(selectedAdmin.rooms): []; //defining selected admin rooms
        if (currentRooms.includes(convId)) return true; //checks if assigned admin already has converasation in their rooms 

        await db.query(`update admin set rooms = JSON_ARRAY_APPEND (COALESCE(rooms, JSON_ARRAY()), "$", ?) where id = ?`,[convId, selectedAdmin.id]); //updates admin room's json_array

        return true;//returning true if everything success in middleware

    } catch (err) {
        ws.send(JSON.stringify({type: 'internal_error',message: "Could Not Assign Your Chat To Admin. Try Later"})); //returnign internal error message
        ws.close(); //closing websocket connection
        return false; //returnign false from middleware
    };
};

module.exports = asignToAdmin; //exporting middleware