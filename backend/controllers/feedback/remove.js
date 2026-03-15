const db = require('../../middlewares/db')

async function remove(req,res) {
    try{

        const { feedbackId } = req.params

        // validate feedback id

        await db.query('drop from feedback where feedback_id = ?', [Number(feedbackId)])
        return res.status(200).json({message : "Feedback Removed Successfuly" , feedbackId})

    }catch(err){
        return res.status(500).json({message : "Internal Error" , err})
    }
} 

module.exports = remove