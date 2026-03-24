const db = require('../../utils/db');
const onlineAdmins = require('../socket.stores/onlineAdmins');

async function asignToAdmin(convId, ws) {
    try {
        const onlineAdminsArr = Array.from(onlineAdmins.keys());

        if (onlineAdminsArr.length === 0) return ws.send(JSON.stringify({type: 'no_online_admins',message: "Could Not Find Available Admin. Try Later"}));
        
        const [rows] = await db.query(`select id, rooms from admin where id in (?)`,[onlineAdminsArr]);

        let selectedAdmin = null;
        let minRooms = Infinity;

        for (const admin of rows) {
            const parsed = admin.rooms ? JSON.parse(admin.rooms) : [];
            const count = parsed.length;

            if (count < minRooms) {
                minRooms = count;
                selectedAdmin = admin;
            }
        }

        if (!selectedAdmin) return false;

        const currentRooms = selectedAdmin.rooms ? JSON.parse(selectedAdmin.rooms): [];

        if (currentRooms.includes(convId)) return true;

        await db.query(`update admin set rooms = JSON_ARRAY_APPEND (COALESCE(rooms, JSON_ARRAY()), "$", ?) where id = ?`,[convId, selectedAdmin.id]);

        return true;

    } catch (err) {
        ws.send(JSON.stringify({type: 'internal_error',message: "Could Not Assign Your Chat To Admin. Try Later"}));
        ws.close();
        return false;
    }
}

module.exports = asignToAdmin;