require('dotenv').config()

const Stripe = require('stripe')
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET_KEY

const db = require('../../middlewares/db')

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
            
            res.status(200).json({success : true , message : 'User Created Succesfully'})

            break

        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object
            console.log('Payment succeeded:', paymentIntent.id)
            
            res.status(200).json({success : true , message : 'Payment Succeeded'})

            break;

        case 'setup_intent.succeeded' : 

            const setupIntent = event.data.object;

            const paymentMethodId = setupIntent.payment_method;
            const customerId = setupIntent.customer;

            const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);

            await db.query('INSERT INTO saved_cards (customer_id, payment_method_id, brand, last4) VALUES (?, ?, ?, ?)',[customerId,paymentMethodId,paymentMethod.card.brand,paymentMethod.card.last4]);
            
            res.status(200).json({success : true , message : 'Card Details Saved Successfully'})

        break;

        default:
            console.log(`Unhandled event type ${event.type}`)
            // return 400 status error
    }

    return res.status(200).json({ received: true })

}

module.exports = webHook