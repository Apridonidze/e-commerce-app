const db = require('../../middlewares/db')

async function list(req,res) {
    try{

        const [orders] = await db.query("select orders.status, orders.created_at, ordered_items.* from orders join ordered_items on ordered_items.order_id = orders.order_id where user_id = ?" , [req.user.userId])
        console.log(orders)
    }catch(err){
        return res.status(500).json({errMessage : "Internal Error" , err : err})
    }
}

module.exports = list