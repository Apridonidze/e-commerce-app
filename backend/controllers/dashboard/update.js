const z = require('zod'); //importing zod library

const db = require('../../utils/db');
const mailer = require('../../utils/mailer'); //importing utils

async function update(req,res) {

    const Schema = z.object({
        orderId : z.number().min(0).max(999),
        status : z.enum(['Pending','OnWay','Delivered'])
    }); //defining schema for request data
    
    function validateParams (data) {return Schema.safeParse(data)}; //validating data with Schema object
    
    const validateParamsResponse = validateParams({orderId : Number(req.params.orderId), status : req.body.status}); //passsing data to validateParams
    if(!validateParamsResponse.success) return res.status(400).json({message: "Invalid Credidentials"}); //returnign error message if validator fails

    try{

        const { orderId } = req.params;
        const { status } = req.body; //defining request data
        
        const [ data ] = await db.query('select orders.total_price, orders.address , users.email from orders join users on users.id = orders.user_id where order_id = ?' , [ orderId ]); //selecting order and user data for updating order and sending mail
        if(data.length === 0) return res.status(404).json({message : "Order Not Found"}); //returning 404 status code error if order not found
 
        const row = data[0]; //defining users data as an object from array

        const [ response ] = await db.query('update orders set status = ? where order_id = ?' , [status, orderId]); //updating order with orderId and status
        if(response.affectedRows === 0) return res.status(404).json({message: "Order With Provided Id Does Not Exists."}); //returning 404 status code if order is not modifed (if not modifed = does not exists)

        
        const html = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2 style="color: #333;">Order Update</h2>
                
                <p><strong>Order ID:</strong> ${orderId}</p>
                <p><strong>Status:</strong> ${status}</p>
                
                <hr style="margin: 16px 0;" />
                
                <p><strong>Total Price:</strong> $${row.total_price}</p>
                <p><strong>Shipping Address:</strong> ${row.address}</p>
                
                <p style="margin-top: 20px;">Thank you for your purchase.</p>
            </div>
        `; //html for mail 

        mailer({
            to: row.email,
            subject: 'Order Update',
            html,
        }).catch(console.error); //sending mail to customer with error catching
        
        return res.status(200).json({message : "Order Updated Successfully", status}); //sending 200 stsatus code if order update success

    }catch(err){
        return res.status(500).json({message : "Could Not Update Order Status. Try Later"}); //returnign error message if internal error occcurs 
    };
};

module.exports = update; //exporting service