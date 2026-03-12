const db = require("../../middlewares/db");

async function orderList (req,res) {
    try{
        const { status, offset } = req.params; //filter statuses
        const limit = 15;

        const [ orders ] = await db.query(`select orders.*, users.fullname, users.email from orders join users on orders.user_id = users.id where orders.status = ? limit ?` , [status, limit+ Number(offset)]);
        if(orders.length === 0) return res.status(204)

        return res.status(200).json({message : "Orders Fetched Successfully" , orders})

    }catch(err){
        console.log(err)
        return res.status(500).json({message : "Internal Error" , err})
    }
}

module.exports = orderList