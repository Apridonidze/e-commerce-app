const db = require('../../utils/db')

async function lowStock(req,res) {
    
    let params = req.params.offset;

    if(!Number(params) || Number(params) < 0) return res.status(400).json({message : "Invalid Offset Parameter"})

    try{

        const limit = 15
        const offset = Number(req.params.offset)

        const [ row ]  = await db.query("select products.products_id, products.images, products.title, products.description, products.category, products.subcategory, products.price, products.sales_price, products.amount from products where products.amount < 6 limit ? , ?", [offset , offset + limit])
        
        if(row.length === 0)return res.status(204).send()

            console.log(row)
        return res.status(200).json({message : "Low stock items fetched successfully" ,  items : row})


    }catch(err){
        return res.status(500).json({message : "Could Not Fetch Low Stock Items. Try Later"})
    }
}

module.exports = lowStock