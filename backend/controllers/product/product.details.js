const db = require('../../utils/db'); //importing db utility

async function productDetails (req,res) {
    
    const { id } = req.query; //defining request data
    if(!Number(id) || id <= 0) return res.status(400).json({message : "Invalid Product Id Format."}); //validating request params

    try{

        const [ products ] = await db.query('select * from products where products_id = ?' , [Number(id)]); //selecting product details

        if(products.length === 0) return res.status(404).json({message : 'Product Not Found'}); //sending 404 status code if product is not found with this id
        return res.status(200).json({message : "Product Found" , product : products[0]}); //sending product details
    
    }catch(err){
        return res.status(500).json({message : 'Could Not Fetch Product Details.'}); //returning error message
    };
};

module.exports = productDetails;//exporiting service