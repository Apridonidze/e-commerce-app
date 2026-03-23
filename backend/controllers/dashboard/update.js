const z = require('zod');

const db = require('../../utils/db');
const mailer = require('../../utils/mailer');

async function update(req,res) {

    const Schema = z.object({
        orderId : z.number().min(0).max(999),
        status : z.enum(['Pending','OnWay','Delivered'])
    });
    
    function validateParams (data) {return Schema.safeParse(data)};
    
    const validateParamsResponse = validateParams({orderId : Number(req.params.orderId), status : req.body.status});
    if(!validateParamsResponse.success) return res.status(400).json({message: "Invalid Credidentials"});
    

    try{

        const { orderId } = req.params;
        const { status } = req.body;
        
        const [ data ] = await db.query('select orders.total_price, orders.address , users.email from orders join users on users.id = orders.user_id where order_id = ?' , [ orderId ])
        if(data.length === 0) return res.status(404).json({message : "Order Not Found"})

        const row = data[0]

        const [ response ] = await db.query('update orders set status = ? where order_id = ?' , [status, orderId]);
        if(response.affectedRows === 0) return res.status(404).json({message: "Order With Provided Id Does Not Exists."});

        
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
        `;

        mailer({
            to: row.email,
            subject: 'Order Update',
            html,
        }).catch(console.error); //sending mail to customer
        
        return res.status(200).json({message : "Order Updated Successfully", status}); //sending 200 stsatus code if order update success

    }catch(err){
        return res.status(500).json({message : "Could Not Update Order Status. Try Later"}); //returnign error message if internal error occcurs 
    };
};

module.exports = update; //exporting service