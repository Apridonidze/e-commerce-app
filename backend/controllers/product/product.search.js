const db = require('../../utils/db')
const SearchSchema = require('../../schemas/SearchSchema')

async function productSearch(req,res) {
    try{

        const ValidateSearch = SearchSchema(req.body)
        if(!ValidateSearch.success) return res.status(400).json({message : "Invalid Input" , products : []})
        
        const searchInput = req.body.searchItem;
        const onSale = req.body.type === 'sales' ? true : false;

        let query = 'select products.products_id, products.images, products.title, products.description, products.category, products.subcategory, products.price, products.sales_price ,products.amount, products.date from products where LOWER(products.title) like LOWER(?)'

        if(onSale){
        
            query += 'and products.sales_price != ?'

            const [ datalist ] = await db.query(query, [`${searchInput}%` , null])

            if(datalist.length === 0) return res.status(204).send()
        
            return res.status(200).json({message : "Items Found" , products : datalist})
            
        }


        const [ datalist ] = await db.query('select products.products_id, products.images, products.title, products.description, products.category, products.subcategory, products.price, products.sales_price ,products.amount, products.date from products where LOWER(products.title) like LOWER(?)', [`${searchInput}%`])
        if(datalist.length === 0) return res.status(204).send()
        
        return res.status(200).json({message : "Items Found" , products : datalist})

    }catch(err){
        console.log(err)
        return res.status(500).json({errMessage : "Internal Error" , err : err})
    }   
}

module.exports = productSearch;