require('dotenv').config();//importing env file
const db = require('../../utils/db');//importing db utility

const Stripe = require('stripe'); //importing stripe library
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); //initializing stripe client setup 


async function createCustomer(req,res){
    try{

        const { email } = req.body;
        const userId = req.user?.userId;//defining data from request body and rom middleware

        const customer = await stripe.customers.create({email}); //creating customer via stripe

        await db.query('insert into stripe_users (user_id , customer_id) values (?,?)' , [userId, customer.id]); //storing customer_id in db
        return res.status(200).json({message : "Stripe User Generated", stripe_customer_id : customer.id});//returning success message

    }catch(err){
        return res.status(500).json({message : "Could Not Create Stipe Customer Intent. Try Later"}); //returning error message
    };
};

module.exports = createCustomer;//exporting service