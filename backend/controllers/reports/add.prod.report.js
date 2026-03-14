const db = require('../../middlewares/db')

async function addProdReport(req,res) {
    try{
        const productId = req.params.id
        const data = req.body.data

        // add zod schema for data

        await db.query('insert into report (id, product_id ,type, content) values (?,?,?,?)' , [req.user.userId , productId, "Product" , data.content])
        return res.status(200).json({message : "Report Sent Successfully"})

    }catch(err){
        return res.status(500).json({errMessage : "Internal Erorr" , err : err})
    }
}


module.exports = addProdReport