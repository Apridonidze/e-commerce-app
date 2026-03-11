const db = require('../../middlewares/db')

async function update(req,res) {
    try{

        const orderId = req.params.orderId
        const status = req.body.status

        await db.query('update orders set status = ? where order_id = ?' , [status, orderId])
        return res.status(200).json({message : "Order Updated Successfully"})

        // add node mailer for user whos order status got updated

    }catch(err){
        console.log(err)
        return res.status(500).json({message : "Internal Error" , err})
    }
}

module.exports = update;