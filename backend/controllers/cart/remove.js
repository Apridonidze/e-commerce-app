const db = require('../../middlewares/db');

async function remove(req,res) {

    const productId = req.params.id

    if(!Number(productId)) return res.status(400).json({message : "Invalid Product Id"})

    try{

        const [ response ] = await db.query('delete from cart where id = ? and product_id = ?' , [req.user.userId , productId])
        
        if(response.affectedRows === 0) return res.status(404).json({message : 'Item Not Found In Your Cart'})
        return res.status(200).json({message : "Product Removed From Cart Successfully"})

    }catch(err){
        return res.status(500).json({message : "Could Not Remove Item From Cart. Try Later"})
    }
}

module.exports = remove;