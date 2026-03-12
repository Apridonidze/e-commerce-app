const db = require("../../middlewares/db");

async function orderList (req,res) {
    try{
        const { status, offset } = req.params;
        
        // const limit = 15;

        // const [ orders ] = await db.query(`select orders.*, users.fullname, users.email from orders join users on orders.user_id = users.id where orders.order_status = ? limit ?` , [orderStatus, limit+ offset]);

        console.log(req.params)

    }catch(err){
        console.log(err)
        return res.status(500).json({message : "Internal Error" , err})
    }
}

module.exports = orderList