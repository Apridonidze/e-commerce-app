const db = require('../../middlewares/db')

async function add(req,res) {
    try{

        const data = req.body.data
        //validate data in zod schema

        const report = await db.query('insert into reports (id, type, content, product_id) values (?, ?, ?, ?, ?)' , [req.user.userId , data.type , data.content, data.productId ?? null , status])
        return res.status(200).json({message : "Report Send Successfully" ,reportId : report.insertId })


    }catch(err){
        return res.status(500).json({errMessage : "Internal Error" , err : err})
    }
}

module.exports = add;