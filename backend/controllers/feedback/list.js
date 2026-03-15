const db = require('../../middlewares/db')

async function list(req,res) {
    
    const { offset = 0 } = req.params;
    const limit = 10;

    try{

        const [ feedbacks ] = await db.query('select feedback.*, users.fullname, products.title from feedback join users on users.id = feedback.id join products on products.products_id = feedback.product_id limit ? offset ?', [limit, Number(offset)])
        if(feedbacks.length === 0) return res.status(204)

        return res.status(200).json({message : "Feedbacks Found" , feedbacks : feedbacks})

    }catch(err){
        console.log(err)
        return res.status(500).json({errMessage : "Internal Error" , err : err})
    }
}

module.exports = list