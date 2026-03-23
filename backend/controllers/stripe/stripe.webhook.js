require('dotenv').config();//importing env file
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET_KEY; //defining webhook secret key

const Stripe = require('stripe'); //importing stipe library
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); //initializing stirpe setup

const db = require('../../utils/db');//importing db utility

async function webHook(req,res){

    let event;
    const signature = req.headers['stripe-signature']; //defining signature from request header

    try{

        event = stripe.webhooks.constructEvent(req.body, signature, endpointSecret); //aassigning webhook event to event vairable

    }catch(err){
        return res.status(500).json({message : "Could Not Connect To Stripe WebHook. Try Later"}) ; //returning internal error message
    }


    try{

        switch (event.type) {

            case 'setup_intent.succeeded' :  //event type case where setup intent = success

                const setupIntent = event.data.object;//definiing setupIntent

                const paymentMethodId = setupIntent.payment_method; //defining card data
                const customerId = setupIntent.customer;//defining customer data

                const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);//submitting card data

                await db.query('update stripe_users set payment_method_id = ?, brand = ?, last4 = ? where customer_id = ?',[paymentMethodId,paymentMethod.card.brand,paymentMethod.card.last4,customerId]); //saving data in stripe_users table
                
            break;

            case 'setup_intent.created':
                res.status(200).json({message : "Setup Intent Created Successfully"});//returnin success message if setup intent is created successfully
            break;

            default:
                console.log(`Unhandled event type ${event.type}`);
                //console loggin unhadnled event types (no handling for now)
                //unhandled event types will be payment_intent
            };

        return res.status(200).json({ received: true }); //returning success message

    }catch(err){
        return res.status(500).json({ error: 'Webhook processing failed' }); //returning internal error message
    };
};

module.exports = webHook; //exporting service