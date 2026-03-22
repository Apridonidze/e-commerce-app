const db = require('../../utils/db')

async function customerList (req,res) {
    try{

        const [ feedbacks ] = await db.query('select * from feedback where type = ?' , ['platform'])
        if(feedbacks.length === 0) return res.status(204).send()

        return res.status(200).json({message : "Feedbacks Found" , feedbacks})

    }catch(err){
        return res.status(500).json({message : "Internal Error" , err})
    }
}


module.exports = customerList;