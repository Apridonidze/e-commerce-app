const db = require('../../utils/db'); //importing db utility

async function customerList (req,res) {
    try{

        const [ feedbacks ] = await db.query('select * from feedback where type = ? limit ?' , ['platform', 10]);//fetching latest 10 feedbacks from db

        if(feedbacks.length === 0) return res.status(204).send(); //returnig 204 status code response if no feedbacks found
        return res.status(200).json({message : "Feedbacks Found" , feedbacks}); //returnig 200 status code response with feedbacks

    }catch(err){
        return res.status(500).json({message : "Could Not Fetch Feedbacks. Try Later"}); //returnign 500 status code error if internal error occurs
    };
};

module.exports = customerList; //exporting service