const db = require('../../middlewares/db')

async function list(req,res) {
    try{

        const [orders] = await db.query("select orders.status, orders.created_at, ordered_items.* from orders join ordered_items on ordered_items.order_id = orders.order_id where user_id = ?" , [req.user.userId])
        
        if(orders.length === 0) return res.status(204)

        return res.status(200).json({message : 'Orders Fetched Successfully' , orders})

    }catch(err){
        return res.status(500).json({errMessage : "Internal Error" , err : err})
    }
}

module.exports = list