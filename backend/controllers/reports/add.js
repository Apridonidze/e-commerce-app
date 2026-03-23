const z = require('zod');
const db = require('../../utils/db');

async function add(req,res) {

    const data = req.body;//defining data from request

    const Schema = z.object({
        type : z.enum(['Platform','Service','Product','Delivery','Other']),
        content : z.string().min(20).max(500),
        productId : z.preprocess(val => val !== undefined ? Number(val) : undefined,z.number().optional()),
        status : z.enum(['Sent','Responded','Removed'])
    });//defining schema for requests data
            
    function validateParams (data) {return Schema.safeParse(data)}; //definign functuon to valdiate data with schema provided
            
    const validateParamsResponse = validateParams(data); //passing data to validator funciton 
    if(!validateParamsResponse.success) return res.status(400).json({message: "Invalid Credidentials"});  //returning error message if validation fails    
    
    try{

        await db.query('insert into reports (user_id, type, content, product_id, status) values (?, ?, ?, ?, ?)' , [req.user.userId , data.type , data.content, data.productId ?? null , data.status]); //inserting report into db

        return res.status(200).json({message : "Report Send Successfully"});//sending success response

    }catch(err){
        return res.status(500).json({message : "Could Not Send Report. Try Later"});//sending 500 status code error message
    };
};

module.exports = add;//exporting service