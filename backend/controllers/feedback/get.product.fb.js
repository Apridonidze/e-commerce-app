const db = require('../../middlewares/db')

async function getByProdId(req,res) {
    try{

        const prodId = req.params.id

        const [ feedbacks ] = await db.query('select feedback.*, users.fullname from feedback join users on users.id = feedback.id where feedback.type = ? and feedback.product_id = ?', ['product', prodId])

        if(feedbacks.length < 1) return res.status(204).json({message : "No Feedbacks Yet." , feedback  : feedbacks})

        return res.status(200).json({message : "Feedbacks Found" , feedback  : feedbacks})

        
    }catch(err){
        console.log(err)
        return res.status(500).json({errMessage : "Internal Error" , err : err})
    }
}

module.exports = getByProdId