const db = require('../../utils/db'); //importing db utility
const onlineAdmins = require('../socket.stores/onlineAdmins'); //importing online admins object

async function ValidateSocketAdmin (user, ws) {
    try{

        const [isAdmin] = await db.query('select * from admin where id = ?',[user.userId]); //checking if user exists in admin table
        if(isAdmin.length === 0) {ws.send(JSON.stringify({type : "admin_access" , status : 403 , admin_access : false})) ; ws.adminUser = null;return false}; //returning forbidden message to user if their user does not exists in db
        
        ws.adminUser = user; //defining ws.adminUser to use admin user data for websocket logic
        ws.send(JSON.stringify({type : "admin_access" , status : 200 , admin_access : true})); //returnign succcess message to admin

        if(!onlineAdmins.has(ws.adminUser.userId)) {onlineAdmins.set(ws.adminUser.userId , new Set())}; //inserting admin user in onlineAdmin object 

        return true;//exporting ture status

    }catch(err){
        ws.adminUser = null; //defining ws.adminUser as null if internal error occurs and we can not validate admin
        ws.send(JSON.stringify({type : "admin_access" , status : 500 , admin_access : false})); //preventing users from gainiing access
        ws.send(JSON.stringify({type : "internal_error", message : "Internal Error. Try Joining Later"})); //returning internal error message
        ws.close(); //closing websocket connection
        return false; //exporting false status
    };
};

module.exports = ValidateSocketAdmin; //exporting middleware