const db = require('../../middlewares/db')

async function add(req,res) {
    try{

        const amount = req.body.amount
        const productId = req.params.id

        if(!Number(productId)) return res.status(400).json({message : "Invalid Product Id"})
        
        await db.query('insert into cart (id, product_id, amount) values (?,?,?)' , [req.user.userId , productId , amount])
        return res.status(200).json({message : "Product Added In Cart Successfully"})

    }catch(err){
        if(err.code === 'ER_DUP_ENTRY'){
            if(err.message.includes('cart.product_id'))return res.status(400).json({errMessage : 'Product Is Already In Cart' , err : err})
        }
        return res.status(500).json({errMessage : "Internal Error" , err : err})
    }
}

module.exports = add