require('dotenv').config()

const Stripe = require('stripe')
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const db = require('../../middlewares/db')

async function createCustomer(req,res){
    try{

        const { email } = req.body
        const userId = req.user.userId

        const customer = await stripe.customers.create({email})

        await db.query('insert into stripe_users (user_id , stripe_user_id) values (?,?)' , [userId, customer.id])
        res.status(200).json({message : "Stripe User Generated", stripe_customer_id : customer.id})

    }catch(err){
        return res.status(500).json({errMessage : "Internal Error" , err : err})
    }
}

module.exports = createCustomer