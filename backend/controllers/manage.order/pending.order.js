const db = require('../../middlewares/db')

async function pending(req,res) {
     try{
    
        const [ PendingProducts ] = await db.query('select orders.*, users.fullname, users.email from orders join users on orders.user_id = users.id where orders.status = ?' , ['Pending'])
        if(PendingProducts.length < 1) return res.status(204)

        return res.status(200).json({message : "Ordered Products" , products : PendingProducts})

    }catch(err){
        return res.status(500).json({errMessage : 'Internal Error' , err : err})
    }
}

module.exports = pending