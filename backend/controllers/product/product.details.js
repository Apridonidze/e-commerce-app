const db = require('../../middlewares/db')

async function productDetails (req,res) {
    const { id } = req.query;
  
    try{

        const [ products ] = await db.query('select * from products where products_id = ?' , id)

        if(products.length === 0) return res.status(404).json({message : 'Product Not Found' , product : products[0]})
        
        return res.status(200).json({message : "Product Found" , product : products[0]})
    }catch(err){
        return res.status(500).json({errMessage : 'Internal Errror' , err : err})
    }
}

module.exports = productDetails;