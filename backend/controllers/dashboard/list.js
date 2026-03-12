const db = require('../../middlewares/db')
const onlineAdmins = require('../../socket/socket.stores/onlineAdmins')

async function list(req,res) {
    try{
        
        const [orders] = await db.query(`select orders.*, users.fullname, users.email from orders join users on orders.user_id = users.id`);

        const pending = orders.filter(o => o.status === "Pending").slice(0,5);
        const onWay = orders.filter(o => o.status === "OnWay").slice(0,5);
        const delivered = orders.filter(o => o.status === "Delivered").slice(0,5);

        const onlineAdminList = [...onlineAdmins.keys()];

        const [admins] = await db.query('select id, fullname from users where id in (?)',[onlineAdminList]);

        return res.json({pending,onWay,delivered, admins});

        
    }catch(err){
        console.log(err)
        return res.status(500).json({message : "Internal Error" , err})
    }
}


module.exports = list;