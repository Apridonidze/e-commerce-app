const z = require('zod')

const db = require('../../utils/db')
const mailer = require('../../utils/mailer')

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

        const [ response ] = await db.query('update orders set status = ? where order_id = ?' , [status, orderId]);
        if(response.affectedRows === 0) return res.status(404).json({message: "Order With Provided Id Does Not Exists."})
        
        const html = `
            <h2>Order Update</h2>
            <p>Order ID: ${orderId}</p>
            <p>Status: ${status}</p>
        `;

        mailer({
            to: req.user.userEmail,
            subject: 'Order Update',
            html,
        }).catch(console.error);
        
        return res.status(200).json({message : "Order Updated Successfully", status});

        

    }catch(err){
        return res.status(500).json({message : "Could Not Update Order Status. Try Later"})
    }
}

module.exports = update;