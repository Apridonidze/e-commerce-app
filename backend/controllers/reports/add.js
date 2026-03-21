const db = require('../../middlewares/db')

async function add(req,res) {
    try{

        const data = req.body
        //validate data in zod schema

        const [ report ] = await db.query('insert into reports (user_id, type, content, product_id, status) values (?, ?, ?, ?, ?)' , [req.user.userId , data.type , data.content, data.productId ?? null , data.status])
        return res.status(200).json({message : "Report Send Successfully" , reportId : report.insertId })


    }catch(err){
        console.log(err)
        return res.status(500).json({errMessage : "Internal Error" , err : err})
    }
}

module.exports = add;