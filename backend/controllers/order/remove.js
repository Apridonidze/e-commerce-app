const db = require('../../utils/db')

async function remove(req,res) {
    try{

        const { id } = req.params;
        if(!Number(id) || id <= 0) return res.status(400).json({message : "Invalid Product Id Format."});


        const [ response ] = await db.query('delete from orders where user_id = ? and order_id = ?' , [req.user.userId, Number(id)])
        if(response.affectedRows === 0) return res.status(400).json({message : "Order Not Found"})

        return res.status(200).json({message : "Order Deleted", orderId : Number(id)})

    }catch(err){
        console.log(err)
        return res.status(500).json({message : "internal error" , err})
    }
}

module.exports = remove