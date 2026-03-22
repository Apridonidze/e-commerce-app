const db = require('../../utils/db')

async function list(req,res) {
   

    try{

        let { offset = 0, status } = req.params
        const limit = 10;

        offset = Number(offset)

        if (Number.isNaN(offset) || offset < 0) {return res.status(400).json({ message: "Invalid offset" })}
        if (status == "undefined") status = undefined

        let query = `select feedback.*, users.fullname, products.title from feedback join users on users.id = feedback.id left join products on products.products_id = feedback.product_id`
        const params = []

        if (status) {
            query += ` where feedback.type = ?`
            params.push(status)
        }

        query += ` limit ? offset ?`
        params.push(limit, offset)

        const [ feedbacks ] = await db.query(query, params)
        
        if(feedbacks.length === 0) return res.status(204)

        return res.status(200).json({message : "Feedbacks Found" , feedbacks : feedbacks})

    }catch(err){
        console.log(err)
        return res.status(500).json({errMessage : "Internal Error" , err : err})
    }
}

module.exports = list