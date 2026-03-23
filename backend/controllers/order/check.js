const db = require('../../utils/db'); //importing db utility

async function check(req,res) {
    
    const orderId = Number(req.params.id); //defininig request param
    if(!Number(orderId) || orderId <= 0) return res.status(400).json({message : "Invalid Order Id Format."}); //validating request param
    
    try{

        const [orderItems] = await db.query('select ordered_items.product_id , products.products_id,products.images , products.title, products.description, products.category, products.subcategory , products.price from ordered_items join products on products.products_id = ordered_items.product_id where order_id = ?', [orderId]) ; //selecting order items data
        
        if(orderItems.length === 0) return res.status(204).send(); //sending 204 status code if order items not found
        return res.status(200).json({message : 'Ordered Items Fetched Successfully' , orderItems}); //sending orderItems if found

    }catch(err){
        return res.status(500).json({message : "Could Not Fetch Orders.Try Later"}); //sending internnal error message to frontend
    };
};

module.exports = check;//exporting service