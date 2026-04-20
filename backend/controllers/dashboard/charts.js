const db = require('../../utils/db')

async function charts(req,res){
    try{

        const [ soldItems ] = await db.query('select ordered_items.product_id, ordered_items.amount, orders.created_at, products.products_id, products.images, products.title, products.description, products.category, products.subcategory, products.price, products.sales_price, products.amount from products order by products.date from ordered_items join orders on ordered_items.order_id = orders.order_id join products on products.products_id = ordered_items.product_id'); //selecting sold items to generate charts data for admin dashobard

    }catch(err){
        return res.status(500).json({message : "Could Not Load Dashboard Information. Try Later"}); //returning internal error message
    }
}

module.exports = charts