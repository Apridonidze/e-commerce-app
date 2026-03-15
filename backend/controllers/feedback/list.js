const db = require('../../middlewares/db')

async function list(req,res) {
    try{

        const [ feedbacks ] = await db.query('select feedback.*, users.fullname from feedback join users on users.id = feedback.id where feedback.type = ?', ['platform'])
        if(feedbacks.length < 1) return res.status(204).json({message : "No Feedbacks Yet." , feedback  : feedbacks})

        return res.status(200).json({message : "Feedbacks Found" , feedbacks})

    }catch(err){
        return res.status(500).json({errMessage : "Internal Error" , err : err})
    }
}

module.exports = list