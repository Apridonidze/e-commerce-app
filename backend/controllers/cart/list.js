const db = require('../../middlewares/db')

async function list(req,res) {
    try{
        
        const [ cartItems ] = await db.query('select * from cart join products on cart.product_id = products.products_id where cart.id = ?' , [req.user.userId])

        if(cartItems.length < 1) return res.status(204)
        
        return res.status(200).json({message : 'Found Items In Your Cart' , products : cartItems})

    }catch(err){
        return res.status(500).json({errMessage : 'Internal Error While Fetching cart items' , err : err})
    }
}

module.exports = list