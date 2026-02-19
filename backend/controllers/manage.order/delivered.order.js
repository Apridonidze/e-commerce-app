const db = require('../../middlewares/db')

async function delivered(req,res) {
    try{

        const [ DeliveredProducts ] = await db.query('select products.* , cart.* , users.id , users.fullname , users.email from cart join products on cart.product_id = products.products_id join users on products.id = users.id where cart.status = ?' , 'on way')
        if(DeliveredProducts.length < 1) return res.status(400).json({message : "No Products Has Been Delivered Yet" , products : []})

        return res.status(200).json({message : "Delivered Products" , products: DeliveredProducts})


    }catch(err){
        return res.status(500).json({errMessage : "Internal Error" , err : err})
    }
}

module.exports = delivered