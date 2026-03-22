const db = require('../../utils/db')

async function list(req,res) {
   try{

        const limit = 15
        const offset = parseInt(req.query.offset) || 0;
        const category = req.query.category || null;
 
        if(category){
            const [ filteredProducts ] = await db.query('select products.products_id, products.images, products.title, products.description, products.category, products.subcategory, products.price, products.sales_price, products.amount from products where subcategory = ? order by products.date limit ? , ?' , [category,offset , offset + limit])
            if(filteredProducts.length < 1) return res.status(204).json({message : "No Products In That Category" , products : []}) //change 200 status code with 204
            
            return res.status(200).json({message : "Products Found With This Category" , products : filteredProducts})

        }

        const [ products ] = await db.query('select products.products_id, products.images, products.title, products.description, products.category, products.subcategory, products.price, products.sales_price,  products.amount from products order by products.date limit ? , ?' , [offset , offset + limit])
        return res.status(200).json({message : 'Products Fetched Succesfully' , products : products})

    }catch(err){
        return res.status(500).json({errMessage : 'Internal Errror' , err : err})
    }
}

module.exports = list;