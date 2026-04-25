const z = require('zod'); //importing validator library
const db = require('../../utils/db'); //importing db utility

async function addByProdId(req,res) {

    const data = req.body;
    const prodId = req.params.id; //defining request provided data

    const Schema = z.object({
        content : z.string().min(0).max(255),
        star : z.number().min(0).max(5),
        prodId : z.number().min(0)
    }); //defining schema for request data
            
    function validateParams (data) {return Schema.safeParse(data)}; //function that validates request data with zod schema
            
    const validateParamsResponse = validateParams({content : data.content, star : Number(data.star), prodId: Number(prodId)}); //passing request data to validator 
    if(!validateParamsResponse.success) return res.status(400).json({message: "Invalid Credidentials"});  //returnign error message if validator fails

    try{
        
        const [ row ] = await db.query('insert into feedback (id, content, stars, product_id, type) values (?, ?, ?, ?, ?)' , [req.user.userId , data.content, data.star, prodId, 'product']); //inserting feedback into table
        return res.status(200).json({message : "Feedback Sent Succesfully", product_id : row.insertId}); //returning success message

    }catch(err){
        return res.status(500).json({errMessage : "Could Not Send Feedback. Try Later"}); //returning internal error message
    };
};

module.exports = addByProdId;//exporting service