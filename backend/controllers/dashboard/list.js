const db = require('../../utils/db'); //importing db middleware

const onlineAdmins = require('../../socket/socket.stores/onlineAdmins'); //importing online admin object from socket.sotres (to dispaly online admins)

async function list(req,res) {
    try{
        
        const [ orders ] = await db.query(`select orders.*, users.fullname, users.email from orders join users on orders.user_id = users.id`); //selecting orders

        const pending = orders.filter(o => o.status === "Pending").slice(0,5);
        const onWay = orders.filter(o => o.status === "OnWay").slice(0,5);
        const delivered = orders.filter(o => o.status === "Delivered").slice(0,5); //getting 5 of each status items

        const [ soldItems ] = await db.query('select ordered_items.product_id, ordered_items.amount, ordered_items.price , orders.created_at from ordered_items join orders on ordered_items.order_id = orders.order_id '); //selecting sold items to generate charts data for admin dashobard
        
        const [ allAdmins ] = await db.query('select admin.id , users.fullname from admin join users on users.id = admin.id'); //getting all admins lists
        const onlineAdminList = [...onlineAdmins.keys()]; //getting online admins list from admins objects
        const offlineAdmins = allAdmins.filter(admin => !onlineAdminList.includes(admin.id)); //generating offline admins with filtering all admins with online admins

        if(onlineAdminList.length === 0) return res.status(200).json({pending,onWay,delivered, soldItems, onlineAdmins: onlineAdminList , offlineAdmins}); //returning data if there is no online admin right now

        const [ admins ] = await db.query('select id, fullname from users where id in (?)',[onlineAdminList]); //fetching admins non-sensitive data if we have online admins
        return res.status(200).json({pending,onWay,delivered, soldItems, onlineAdmins: admins , offlineAdmins }); //returning data to admin dashobard
        
    }catch(err){
        return res.status(500).json({message : "Internal Error"}); //returning internal error message
    };
};

module.exports = list; //exporting service