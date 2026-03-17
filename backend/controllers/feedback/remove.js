const db = require('../../middlewares/db')

async function remove(req,res) {
    try{

        const { feedbackId } = req.params

        // validate feedback id

        const [response] = await db.query('delete from feedback where feedback_id = ?', [Number(feedbackId)])
        if(response.affectedRows === 0) return res.status(400).json({message : "Feedback Not Found"})

        return res.status(200).json({message : "Feedback Removed Successfuly" , feedbackId})

    }catch(err){
        console.log(err)
        return res.status(500).json({message : "Internal Error" , err})
    }
} 

module.exports = remove