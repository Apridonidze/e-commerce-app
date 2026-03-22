const db = require('../../utils/db'); //importing db middleware

async function list(req,res) {
    try{
        
        const [ cartItems ] = await db.query('select cart.*, products.products_id, products.title, products.images, products.description, products.category,products.subcategory, products.price from cart join products on cart.product_id = products.products_id where cart.id = ?' , [req.user.userId]); // fetching cart products with product details

        if(cartItems.length < 1) return res.status(204).send(); //sending 204 status code if user has no cart item
        return res.status(200).json({message : 'Found Items In Your Cart' , cartItems : cartItems}); //sending 200 status code with card items

    }catch(err){
        return res.status(500).json({message : 'Internal Error While Fetching cart items'}); //returning 500 status code internal error message
    };
};

module.exports = list; //exporting service