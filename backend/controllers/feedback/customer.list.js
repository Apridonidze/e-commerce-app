const db = require('../../utils/db'); //importing db utility

async function customerList (req,res) {
    try{

        const [ feedbacks ] = await db.query('select feedback.*, users.fullname from feedback join users on users.id = feedback.id where feedback.type = ? limit 5', ['platform']); //selecting feedback with users name

        return res.status(200).json({message : "Feedbacks Found" , feedbacks}); //returnig 200 status code response with feedbacks

    }catch(err){
        return res.status(500).json({message : "Could Not Fetch Feedbacks. Try Later"}); //returnign 500 status code error if internal error occurs
    };
};

module.exports = customerList; //exporting service