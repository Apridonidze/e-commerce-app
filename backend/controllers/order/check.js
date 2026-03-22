const db = require('../../utils/db')

async function check(req,res) {
    try{

        const orderId = Number(req.params.id)

        if(!orderId || typeof(orderId) !== "number") return res.status(400).json()

        const [orderItems] = await db.query('select ordered_items.product_id , products.products_id,products.images , products.title, products.description, products.category, products.subcategory , products.price from ordered_items join products on products.products_id = ordered_items.product_id where order_id = ?', [orderId])
        return res.status(200).json({message : 'Ordered Items Fetched Successfully' , orderItems})

    }catch(err){
        console.log(err)
        return res.status(500).json({message : "Internal Error" , err})
    }
}

module.exports = check;