const db = require('../../middlewares/db')

async function me (req,res) {
    try{
        const userId = req.user.userId

        const [ details ] = await db.query('select * from stripe_users where stripe_users.user_id = ?' , userId)

        if(details.length === 0) return res.status(204)
        
        return res.status(200).json({message : "Stripe Customer Id Fetched" , details : details[0]})

    }catch(err){
        console.log(err)
        return res.status(500).json({errMessage : "Internal Error while fetchging card" , err : err})
    }
}

module.exports = me