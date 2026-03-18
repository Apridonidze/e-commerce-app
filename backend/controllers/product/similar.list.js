const db = require('../../middlewares/db')

async function add(req,res) {

   const {category, subcategory, id} = req.query

    try{

        //check category and subcategoryt in zod

        const [products] = await db.query('select products_id, images , title, description ,price , sales_price, amount, category, subcategory from products where category like ? and subcategory like ? and products_id != ?' , [category, subcategory, id])

        if(products.length < 1) return res.status(204)

        return res.status(200).json({message : "Products Found" , products: products})

    }catch(err){
        console.log(err)
        return res.status(500).json({errMessage : 'Internal Error', err : err})
    }
}

module.exports = add;