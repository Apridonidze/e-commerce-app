const db = require('../../utils/db');//importing db utility
const SearchSchema = require('../../schemas/SearchSchema');//importing zod schema for serachbar

async function productSearch(req,res) {
    try{

        const ValidateSearch = SearchSchema(req.body);//passing data to validator
        if(!ValidateSearch.success) return res.status(400).json({message : "Invalid Input" , products : []});//sending error message if zod validator fails 
        
        const searchInput = req.body.searchItem;//defining searchInput from request
        const onSale = req.body.type === 'sales' ? true : false; //definiing if product is on sale
        
        let query = 'select products.products_id, products.images, products.title, products.description, products.category, products.subcategory, products.price, products.sales_price ,products.amount, products.date from products where LOWER(products.title) like LOWER(?)'; //main query

        if(onSale){ //checking if parameters are provided from sales page
        
            query += ' and products.sales_price != ?'; //adding query to main query to fetch sales product

            const [ datalist ] = await db.query(query, [`${searchInput}%` , null]); //searching for product in db

            if(datalist.length === 0) return res.status(204).send(); //sending 204 status code if datalist length is 0
            return res.status(200).json({message : "Items Found" , products : datalist}); //sending 200 status code if item exusts
            
        };

        const [ datalist ] = await db.query('select products.products_id, products.images, products.title, products.description, products.category, products.subcategory, products.price, products.sales_price ,products.amount, products.date from products where LOWER(products.title) like LOWER(?)', [`${searchInput}%`]); //fetching list of products that is similar to search input
   
        if(datalist.length === 0) return res.status(204).send(); //sending 204 status code if datalist is empty
        return res.status(200).json({message : "Items Found" , products : datalist}); //sending 200 status code if items exists

    }catch(err){
        return res.status(500).json({message : "Could Not Search Item. Try Later"}) //returnign error message if internal error occurs
    };
};

module.exports = productSearch;//exporiting service