require('dotenv').config()

const Stripe = require('stripe')
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET_KEY

const db = require('../../utils/db')

async function webHook(req,res){

    const signature = req.headers['stripe-signature']

    let event;

    try{

        event = stripe.webhooks.constructEvent(req.body, signature, endpointSecret)

    }catch(err){
        console.log(err)
        return res.status(500).json({errMessage : "Internal Error" , err : err})
    }


    try{

        switch (event.type) {

            case 'customer.created':
                
                break

            case 'payment_intent.succeeded':z
                const paymentIntent = event.data.object
                
                break;

            case 'setup_intent.succeeded' : 

                const setupIntent = event.data.object;

                const paymentMethodId = setupIntent.payment_method;
                const customerId = setupIntent.customer;

                const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);

                await db.query('update stripe_users set payment_method_id = ?, brand = ?, last4 = ? where customer_id = ?',[paymentMethodId,paymentMethod.card.brand,paymentMethod.card.last4,customerId]);            
                
            break;

            case 'setup_intent.created':
                res.status(200).json({message : "Setup Intent Created Successfully"})
            break;

            case 'setup_intent.created':
                res.status(200).json({message : "Setup Intent Created Successfully"})
            break;

            default:
                console.log(`Unhandled event type ${event.type}`)
                // return 400 status error
            }

        return res.status(200).json({ received: true })

    }catch(err){
        console.log(err)
        return res.status(500).json({ error: 'Webhook processing failed' })
    }
}

module.exports = webHook