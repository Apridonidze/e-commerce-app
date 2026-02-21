require('dotenv').config()

const Stripe = require('stripe')
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const db = require('../../middlewares/db')

async function createCustomer(req,res){
    try{

        const {email , userId} = req.body
        const customer = await stripe.customers.create({email})

        await db.query('')

    }catch(err){
        return res.status(500).json({errMessage : "Internal Error" , err : err})
    }
}

module.exports = createCustomer