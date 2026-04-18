const db = require('../../utils/db'); //importing db middleware

const onlineAdmins = require('../../socket/socket.stores/onlineAdmins'); //importing online admin object from socket.sotres (to dispaly online admins)

async function list(req,res) {
    try{
        
        const [ orders ] = await db.query(`select users.fullname, products.title , ordered_items.product_id , ordered_items.amount , ordered_items.price , ordered_items.amount , orders.created_at , orders.status, orders.order_id from ordered_items join orders on ordered_items.order_id = orders.order_id inner join products on ordered_items.product_id = products.products_id join users on users.id = orders.user_id`); //selecting orders

        const groupedOrders = Object.values(
            orders.reduce((acc, item) => {
                if (!acc[item.order_id]) {
                    acc[item.order_id] = {
                        order_id: item.order_id,
                        ordered_by : item.fullname,
                        status: item.status,
                        created_at: item.created_at,
                        products: [],
                        status : item.status
                    };
                }

                acc[item.order_id].products.push({
                    product_id: item.product_id,
                    amount: item.amount,
                    price: item.price,
                    title: item.title,
                });

            return acc;
            }, {})
        ); //defining accumulation of order (struccture of order for multiple products in order and forming them in structured object)

        console.log(groupedOrders[0])

        const pending = groupedOrders.filter(o => o.status === "Pending").slice(0,5);
        const onWay = groupedOrders.filter(o => o.status === "OnWay").slice(0,5);
        const delivered = groupedOrders.filter(o => o.status === "Delivered").slice(0,5); //getting 5 orders of each status items

        const [ soldItems ] = await db.query('select ordered_items.product_id, ordered_items.amount, ordered_items.price , orders.created_at from ordered_items join orders on ordered_items.order_id = orders.order_id '); //selecting sold items to generate charts data for admin dashobard
        
        const [ allAdmins ] = await db.query('select admin.id , users.fullname from admin join users on users.id = admin.id'); //getting all admins lists
        const onlineAdminList = [...onlineAdmins.keys()]; //getting online admins list from admins objects
        const offlineAdmins = allAdmins.filter(admin => !onlineAdminList.includes(admin.id)); //generating offline admins with filtering all admins with online admins

        if(onlineAdminList.length === 0) return res.status(200).json({pending,onWay,delivered, soldItems, onlineAdmins: onlineAdminList , offlineAdmins}); //returning data if there is no online admin right now

        const [ admins ] = await db.query('select id, fullname from users where id in (?)',[onlineAdminList]); //fetching admins non-sensitive data if we have online admins
        return res.status(200).json({pending,onWay,delivered, soldItems, onlineAdmins: admins , offlineAdmins }); //returning data to admin dashobard
        
    }catch(err){
        console.log(err)
        return res.status(500).json({message : "Internal Error"}); //returning internal error message
    };
};

module.exports = list; //exporting service