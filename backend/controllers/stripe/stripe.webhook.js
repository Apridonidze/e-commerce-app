require('dotenv').config()

const Stripe = require('stripe')
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

async function webHook(req,res){

    const signature = req.headers['stripe-signature']

    try{



    }catch(err){
        console.log(err)
        return res.send(500).json({errMessage : "Internal Error"})
    }
}

module.exports = webHook