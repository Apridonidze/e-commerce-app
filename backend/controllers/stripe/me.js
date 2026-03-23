const db = require('../../utils/db'); //importing db utility

async function me (req,res) {
    try{

        const [ details ] = await db.query('select * from stripe_users where stripe_users.user_id = ?' , [ req.user.userId ]); //fetching card data from  db

        if(details.length === 0) return res.status(204).send(); //returning empty response if user does not have card details saved
        return res.status(200).json({message : "Stripe Customer Id Fetched" , details : details[0]});

    }catch(err){
        return res.status(500).json({message : "Could Not Fect Card Details. Try Later"}); //returning internal error message
    };
};

module.exports = me;//exporting service