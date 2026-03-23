require('dotenv').config();//importing env file

const Stripe = require('stripe'); //importing stripe library 
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); //initializing stripe customer setup

async function createSetup(req,res){
    try{
        
        const { customerId } = req.body; //defining data from request

        const setup = await stripe.setupIntents.create({
            customer : customerId,
            payment_method_types : ['card']
        });  ///creating stripe setip intent with customer id

        return res.status(200).json({message : "Stripe Setup Created", clientSecret : setup.client_secret}); //returning success message

    }catch(err){
        return res.status(500).json({message : "Could Not Create Stripe Setup. Try Later"});//returning error message
    };
};

module.exports = createSetup; //expoprting service