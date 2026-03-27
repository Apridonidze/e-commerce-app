const db = require('../../utils/db');//importing db utility

async function list(req,res) {
   

    const limit = 15
    const offset = parseInt(req.query.offset) || 0;
    const category = req.query.category || null; //defining request data

    try{
 
        if(category){ //triggering this section if we have defined category
            const [ filteredProducts ] = await db.query('select products.products_id, products.images, products.title, products.description, products.category, products.subcategory, products.price, products.sales_price, products.amount from products where subcategory = ? order by products.date limit ? , ?' , [category,offset , offset + limit]); //selecting product data
            if(filteredProducts.length === 0) return res.status(204).send(); //returnign 204 status code if no products have been found in this category
            
            return res.status(200).json({message : "Products Found With This Category" , products : filteredProducts}); //sending 200 status code if products have been found
        };

        const [ products ] = await db.query('select products.products_id, products.images, products.title, products.description, products.category, products.subcategory, products.price, products.sales_price,  products.amount from products order by products.date limit ? , ?' , [offset , offset + limit]); //selecting products without category from table

        if(products.length === 0) return res.status(204).send();//sending 204 status code if there is no products yet 
        return res.status(200).json({message : 'Products Fetched Succesfully' , products : products}); //sending data to frontend

    }catch(err){
        console.log(err)
        return res.status(500).json({message: 'Could Not Fetch Products. Try Later'})
    };
};

module.exports = list;//exporting serivece