const db = require('../../middlewares/db') 

async function remove(req,res) {
    try{

        const { id } = req.params

        const [ response ] = await db.query('delete from products where products_id = ?' , [Number(id)])
        if(response.affectedRows === 0) return res.status(400).json({message : "Product Not Found"})

        return res.status(200).json({message : "Product Removed Successfully" , productId : id})

    }catch(err){
        console.log(err)
        return res.status(500).json({message : "Internal Error" , err})
    }
}

module.exports = remove;