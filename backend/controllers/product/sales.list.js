const db = require('../../utils/db');//importing db utility

async function salesList (req, res) {

    const limit = 15;//limit for offset
    const offset = parseInt(req.query.offset) || 0;
    const category = req.query.category || null; //defining data from request

    try{

        if(category){ //triggering this if statement if category is defined
            const [ filteredProducts ] = await db.query('select products.products_id, products.images, products.title, products.description, products.category, products.subcategory, products.price, products.sales_price, products.amount from products where subcategory = ? and sales_price is not null ? order by products.date limit ? , ?' , [category, null ,offset , offset + limit]); //searching for products with limit and offset in table

            if(filteredProducts.length < 1) return res.status(204).send();//returning 204 status code if filtered product array is empty
            return res.status(200).json({message : "Products Found With This Category" , products : filteredProducts}); //returning 200 status code if filtered items are found
        }

        const [ products ] = await db.query('select products.products_id, products.images, products.title, products.description, products.category, products.subcategory, products.price, products.sales_price,  products.amount from products where sales_price is not null order by products.date limit ? , ?' , [offset , offset + limit]); //fetching sales products if category is not defined with offset and limit
        
        if(products.length === 0) return res.status(204).send(); //sending 204 status code if no products are found overally in sales category
        return res.status(200).json({message : 'Products Fetched Succesfully' , products : products});//sending products

    }catch(err){
        return res.status(500).json({message : "Could Not Fetch Products On Sale. Try Later"});//returnign error message if inernal error occurs
    };
};

module.exports = salesList;//exporting service