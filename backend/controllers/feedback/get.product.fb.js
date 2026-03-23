const db = require('../../utils/db'); //importing db utility

async function getByProdId(req,res) {

    const prodId = req.params.id; //defining params
    if (Number.isNaN(prodId) || prodId < 0) {return res.status(400).json({ message: "Invalid Product Id" })}; //validating prodId

    try{

        const [ feedbacks ] = await db.query('select feedback.*, users.fullname from feedback join users on users.id = feedback.id where feedback.type = ? and feedback.product_id = ?', ['product', Number(prodId)]); //selecting feedback with users name

        if(feedbacks.length === 0) return res.status(204).send(); //sending 204 status code response if product has no feedbacks 
        return res.status(200).json({message : "Feedbacks Found" , feedback  : feedbacks}); //returnign 200 status code if product has feedbacks
        
    }catch(err){
        return res.status(500).json({message : "Could Not Fetch Product Feedbacks"});  //returning 500 status code if internal error occurs
    };
};

module.exports = getByProdId; //exporting service