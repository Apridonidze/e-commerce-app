require('dotenv').config()

const Stripe = require('stripe')
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET_KEY

async function webHook(req,res){

    const signature = req.headers['stripe-signature']

    let event;

    try{

        event = stripe.webhooks.constructEvent(req.body, signature, endpointSecret)

    }catch(err){
        console.log(err)
        return res.status(500).json({errMessage : "Internal Error" , err : err})
    }

    switch (event.type) {

        case 'customer.created':
            console.log('Customer created:', event.data)
            break

        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object
            console.log('Payment succeeded:', paymentIntent.id)
            // add 200 status error
            // save payments to db

            break

        default:
            console.log(`Unhandled event type ${event.type}`)
            // return 500 status error
    }

    return res.status(200).json({ received: true })

}

module.exports = webHook