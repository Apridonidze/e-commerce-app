require('dotenv').config()

const Stripe = require('stripe')
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

async function createSetup(req,res){
    try{
        
        const { customerId } = req.body

        const setup = await stripe.setupIntents.create({
            customer : customerId,
            payment_method_types : ['card']
        })

        res.status(200).json({message : "Stripe Setup Created", clientSecret : setup.client_secret})

    }catch(err){
        console.log(err)
        return res.status(500).json({errMessage : "Internal Error" , err : err})
    }
}

module.exports = createSetup