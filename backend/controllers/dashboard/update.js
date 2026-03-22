const z = require('zod')

const db = require('../../middlewares/db')

async function update(req,res) {

    const Schema = z.object({
        orderId : z.number().min(0).max(999),
        status : z.enum(['Pending','OnWay','Delivered'])
    })
    
    function validateParams (data) {return Schema.safeParse(data)}
    
    const validateParamsResponse = validateParams({orderId : Number(req.params.orderId), status : req.body.status})
    if(!validateParamsResponse.success) return res.status(400).json({message: "Invalid Credidentials"})
    

    try{

        const { orderId } = req.params
        const { status } = req.body
        

        await db.query('update orders set status = ? where order_id = ?' , [status, orderId])
        return res.status(200).json({message : "Order Updated Successfully", status})

        // add node mailer for user whos order status got updated

    }catch(err){
        console.log(err)
        return res.status(500).json({message : "Internal Error" , err})
    }
}

module.exports = update;