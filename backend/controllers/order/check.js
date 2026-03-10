const db = require('../../middlewares/db')

async function check(req,res) {
    try{

        const orderId = req.params.id

        console.log(orderId)

        const [orderItems] = await db.query('select ordered_items.product_id , products.products_id,products.images , products.title, products.description, products.category, products.subcategory , products.price from ordered_items join products on products.products_id = ordered_items.product_id where order_id = ?', [orderId])
        console.log(orderItems)
    }catch(err){
        console.log(err)
        return res.status(500).json({message : "Internal Error" , err})
    }
}

module.exports = check;