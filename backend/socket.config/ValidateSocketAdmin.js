const db = require('../config/db')

async function ValidateSocketAdmin (user, ws) {
    try{

        const [isAdmin] = await db.query('select * from admin where id = ?',[user.userId])  
        if(isAdmin.length === 0) {ws.send(JSON.stringify({type : "admin_access" , status : 403 , admin_access : false})) ; return false};
        
        ws.send(JSON.stringify({type : "admin_access" , status : 200 , admin_access : true}))
        return true;

    }catch(err){
        ws.send(JSON.stringify({type : "admin_access" , status : 500 , admin_access : false}))
        ws.send(JSON.stringify({type : "internal_error" , message : err}))
        ws.close()
        return false;
    }
}

module.exports = ValidateSocketAdmin