const db = require('../../middlewares/db')

async function addByProdId(req,res) {
    try{
        const data = req.body
        const prodId = req.params.id
        
        const [ newFeedback ] = await db.query('insert into feedback (id, content, stars, product_id, type) values (?, ?, ?, ?, ?)' , [req.user.userId , data.content, data.star, prodId, 'product'])
        return res.status(200).json({message : "Feedback Sent Succesfully" , feedbackId : newFeedback.insertId})

    }catch(err){
        console.log(err)
        return res.status(500).json({errMessage : "Internal Error" , err : err})
    }
}

module.exports = addByProdId