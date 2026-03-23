const z = require('zod'); //importing validaiton library
const db = require('../../utils/db'); //importing db utility

async function add(req,res) {
    
    const data = req.body; //definiing request body

    const Schema = z.object({
        content : z.string().min(0).max(255),
        stars : z.number().min(0).max(5),
        type : z.enum('product', 'platform')
    });//defining schema for requests data
        
    function validateParams (data) {return Schema.safeParse(data)}; //definign functuon to valdiate data with schema provided
        
    const validateParamsResponse = validateParams({content : data.content, stars : Number(data.stars), type: data.type}); //passing data to validator funciton 
    if(!validateParamsResponse.success) return res.status(400).json({message: "Invalid Credidentials"});  //returning error message if validation fails

    try{

        await db.query('insert into feedback (id, content, stars, type) values (?,?,?,?)' , [req.user.userId , data.content, data.stars, data.type]); //inserting feedback into table
        return res.status(200).json({message : "Feedback Sent Succesfully"}); //returning success message

    }catch(err){
        return res.status(500).json({errMessage : "Could Not Send Feedback. Try Later"}); //returning 500 status code error if internal error occurs
    };
};

module.exports = add;//exporting service