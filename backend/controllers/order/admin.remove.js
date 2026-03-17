const db = require('../../middlewares/db')

async function adminRemove (req,res){
    try{

        const { id } = req.params
        
        const [respnse] = await db.query('delete from orders where order_id = ?' , [Number(id)])
        if(respnse.affectedRows === 0) return res.status(400).json({message : "Order Not Found"})
    
        // add mail to client
        return res.status(200).json({message : 'Order Removed Successfully' , orderId: Number(id)})

    }catch(err){
        return res.status(500).json({message : "Internal Error" , err})
    }
}

module.exports = adminRemove;
