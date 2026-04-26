const db = require('../../utils/db')

async function lowStock(req,res) {
    
    let { offset } = req.params;
    
    if(!Number(offset) && !Number(offset) < 0) return res.status(400).json({message : "Invalid Offset Parameter"})

    try{

        const limit = 15
        const { offset, status } = req.params;

        let param;

        const base = `select products.products_id, products.images, products.title, products.description, products.category, products.subcategory, products.price, products.sales_price, products.amount from products`

        if(status === 'Out Of Stock'){
            param = ' where products.amount = 0 limit ? , ?'

        }else if (status === 'Low Stock'){
            param = ' where products.amount between 1 and 6  limit ? , ?'
        }else{
            param = ' where products.amount < 6  limit ? , ?'
        }
        

        const [ row ]  = await db.query(base + param, [Number(offset) , Number(offset) + limit])
        
        if(row.length === 0)return res.status(204).send()
        return res.status(200).json({message : "Low stock items fetched successfully" ,  items : row})


    }catch(err){
        return res.status(500).json({message : "Could Not Fetch Low Stock Items. Try Later"})
    }
}

module.exports = lowStock