const db = require('../../middlewares/db')

async function add(req,res) {
    try{

        const amount = req.body.amount
        const productId = req.params.id

        if(!Number(productId)) return res.status(400).json({message : "Invalid Product Id"})

        // const [ isAlreadyInCart ] = await db.query('select product_id from cart where id = ? and product_id = ?' , [req.user.userId , productId])
        // if(isAlreadyInCart.length !== 0) return res.status(400).json({message : "You Already Have This Item In Your Cart"})
        
        await db.query('insert into cart (id, product_id, amount) values (?,?,?)' , [req.user.userId , productId , amount])
        return res.status(200).json({message : "Product Added In Cart Successfully"})

    }catch(err){
        return res.status(500).json({errMessage : "Internal Error" , err : err})
    }
}

module.exports = add