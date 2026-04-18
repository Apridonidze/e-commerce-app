const db = require('../../utils/db'); //importing db utility
const mailer = require('../../utils/mailer')
async function adminRemove (req,res){

    const { id } = req.params; //defining request param
    if(!Number(id) || id <= 0) return res.status(400).json({message : "Invalid Id Format."}); //validating request params
    
    try{

        const [ data ] = await db.query('select orders.user_id , orders.total_price, orders.created_at , orders.address , orders.status , users.email from orders join users on orders.user_id = users.id where order_id = ?' , [Number(id)]); //selecting order + user data for mail + to ensure order exists
    
        if(data.length === 0) return res.status(404).json({message : "Order Not Found"}); //returning 404 status code if order is not found by this orderId
        
        const row = data[0]; //defining data from data query
        
        const html = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #333;">Order Discarded By Admin</h2>
        
        <p><strong>Order ID:</strong> ${id}</p>
        <p><strong>Status:</strong> ${row.status}</p>
        
        <hr style="margin: 16px 0;" />
        
        <p><strong>Total Price:</strong> $${row.total_price}</p>
        <p><strong>Shipping Address:</strong> ${row.address}</p>
        
        <p style="margin-top: 20px;">Thank you for your purchase.</p>
        </div>
        `; //html for mail 
        
        mailer({
            to: row.email,
            subject: 'Order Discarded',
            html,
        }).catch(console.error); //sending mail to customer with error catching
        
        await db.query('delete from orders where order_id = ?' , [Number(id)]); //removing order from orders atable
        return res.status(200).json({message : 'Order Removed Successfully' , orderId: Number(id)}); // return response to admin

    }catch(err){
        return res.status(500).json({message : "Could Not Discard Order. Try Later"}); //returning error message
    };
};

module.exports = adminRemove; //exporting service