const db = require("../../middlewares/db"); //importing db middleware
const validateParams = require("../../schemas/ParamsSchema");

async function orderList (req,res) {

    const ParamsSchema = validateParams({status : req.params.status , offset : Number(req.params.offset)}); //passing params to validator
    if(!ParamsSchema.success) return res.status(400).json({message : "Invalid Credidentials"}); //returning error message if validator fails 

    try{
        const { status, offset } = req.params; //defining params
        const limit = 15; //defining default limit for offset

        const [ orders ] = await db.query(`select orders.*, users.fullname, users.email from orders join users on orders.user_id = users.id where orders.status = ? limit ?` , [status, limit+ Number(offset)]); //fetching orders based on the offset + limit amount
        if(orders.length === 0) return res.status(204).send(); //sending 204 status code if no order is found

        return res.status(200).json({message : "Orders Fetched Successfully" , orders}); //sending 200 status code if orders are fetched successfully

    }catch(err){
        return res.status(500).json({message : "Could Not Fetch Order List. Try Later"}); //returning internal error message with 500 status code
    };
};

module.exports = orderList; //exporting service