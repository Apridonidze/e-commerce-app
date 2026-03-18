const db = require('../../middlewares/db')
const onlineAdmins = require('../../socket/socket.stores/onlineAdmins')

async function list(req,res) {
    try{
        
        const [orders] = await db.query(`select orders.*, users.fullname, users.email from orders join users on orders.user_id = users.id`);

        const pending = orders.filter(o => o.status === "Pending").slice(0,5);
        const onWay = orders.filter(o => o.status === "OnWay").slice(0,5);
        const delivered = orders.filter(o => o.status === "Delivered").slice(0,5);

        const [ allAdmins ] = await db.query('select admin.id , users.fullname from admin join users on users.id = admin.id') 
        const onlineAdminList = [...onlineAdmins.keys()];
        const offlineAdmins = allAdmins.filter(admin => !onlineAdminList.includes(admin.id));

        if(onlineAdminList.length === 0) return res.status(200).json({pending,onWay,delivered, onlineAdmins: onlineAdminList , offlineAdmins});

        const [admins] = await db.query('select id, fullname from users where id in (?)',[onlineAdminList]);
        return res.status(200).json({pending,onWay,delivered, onlineAdmins : admins , offlineAdmins });
        
    }catch(err){
        console.log(err)
        return res.status(500).json({message : "Internal Error" , err})
    }
}


module.exports = list;