const db = require('../../middlewares/db')

async function remove(req,res) {
    try{

        const productId = req.params.id

        if(!Number(productId)) return res.status(400).json({message : "Invalid Product Id"})

        const [ isInCart ] = await db.query('select product_id from cart where id = ? and product_id = ?' , [req.user.userId , productId])
        if(isInCart.length === 0) return res.status(400).json({message : "You Do Not Have This Item In Your Cart"})
        
        await db.query('delete from cart where id = ? and product_id = ?' , [req.user.userId , productId])
        return res.status(200).json({message : "Product Removed From Cart Successfully"})

    }catch(err){
        return res.status(500).json({errMessage : "Internal Error" , err : err})
    }
}

module.exports = remove;