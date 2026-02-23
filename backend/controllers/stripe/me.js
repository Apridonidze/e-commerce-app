const db = require('../../middlewares/db')

async function me (req,res) {
    try{
        const userId = req.user.userId

        const [ customerId ] = await db.query('select * from stripe_users where user_id = ?' , userId)

        if(customerId.length === 0) return res.status(204)
        
        res.status(200).json({message : "Stripe Customer Id Fetched" , customerId : customerId[0]})

    }catch(err){
        console.log(err)
        return res.status(500).json({errMessage : "Internal Error" , err : err})
    }
}

module.exports = me