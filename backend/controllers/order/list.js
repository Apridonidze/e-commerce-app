const db = require('../../middlewares/db')

async function list(req,res) {
    try{

        const [orders] = await db.query("select orders.* , ordered_items.product_id, ordered_items.amount, ordered_items.price from orders left join ordered_items on orders.order_id = ordered_items.order_id where orders.user_id = ?" , [req.user.userId])
        if(orders.length === 0) return res.status(204)

        return res.status(200).json({message : 'Orders Fetched Successfully' , orders})

    }catch(err){
        return res.status(500).json({errMessage : "Internal Error" , err : err})
    }
}

module.exports = list