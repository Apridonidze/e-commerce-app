const db = require('../../middlewares/db')

async function onway(req,res) {
    try{
        
        const [ OnWayProducts ] = await db.query('select products.* , cart.* , users.id , users.fullname , users.email from cart join products on cart.product_id = products.products_id join users on products.id = users.id where cart.status = ?' , 'on way')
        if(OnWayProducts.length < 1) return res.status(400).json({message : "No Products Beign Ordered" , products : []})

        return res.status(200).json({message : "Products On Way" , products: OnWayProducts})

    }catch(err){
        return res.status(500).json({errMessage : "Internal Error" , err : err})
    }
}

module.exports = onway