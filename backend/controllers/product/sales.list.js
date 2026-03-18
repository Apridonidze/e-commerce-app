const db = require('../../middlewares/db')

async function salesList (req, res) {

    const limit = 15
    const offset = parseInt(req.query.offset) || 0;
    const category = req.query.category || null;

    try{

        const [ salesProducts ] = await db.query("select * from products where sales_price != null");
        if(salesProducts.length === 0) return res.status(204).send()

        return res.status(200).json({message : "Products On Sale Found" , products : salesProducts})

    }catch(err){
        return res.status(500).json({message : "Internal Error" , err})
    }
}

module.exports = salesList;