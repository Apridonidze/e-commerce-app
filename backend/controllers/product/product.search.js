const db = require('../../middlewares/db')
const SearchSchema = require('../../schemas/SearchSchema')

async function productSearch(req,res) {
    try{

        const ValidateSearch = SearchSchema(req.body)
        if(!ValidateSearch.success) return res.status(400).json({message : "Invalid Input" , products : []})
        const searchInput = req.body.searchItem;


        const [ datalist ] = await db.query('select products.products_id, products.images, products.title, products.description, products.category, products.subcategory, products.price, products.sales_price ,products.amount, products.date from products where LOWER(products.title) like LOWER(?)', [`${searchInput}%`])
        if(datalist.length < 1) return res.status(204)
        
        return res.status(200).json({message : "Items Found" , products : datalist})

    }catch(err){
        console.log(err)
        return res.status(500).json({errMessage : "Internal Error" , err : err})
    }   
}

module.exports = productSearch;