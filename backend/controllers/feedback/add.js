const db = require('../../utils/db')

async function add(req,res) {
    try{
        const data = req.body.data

        // validate data in zod schema

        const [ newFeedback ] = await db.query('insert into feedback (id, content, stars, type) values (?,?,?,?)' , [req.user.userId , data.content, data.stars, data.type])
        return res.status(200).json({message : "Feedback Sent Succesfully" , feedbackId : newFeedback.insertId})

    }catch(err){
        return res.status(500).json({errMessage : "Internal Error" , err : err})
    }
}

module.exports = add