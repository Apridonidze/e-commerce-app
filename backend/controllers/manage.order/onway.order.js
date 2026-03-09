const db = require('../../middlewares/db')

async function onway(req,res) {
    try{
        
        const [ OnWayProducts ] = await db.query('select orders.*, users.fullname, users.email from orders join users on orders.user_id = users.id where orders.status = ?' , ['OnWay'])
        if(OnWayProducts.length < 1) return res.status(204)

        return res.status(200).json({message : "Products On Way" , products: OnWayProducts})

    }catch(err){
        return res.status(500).json({errMessage : "Internal Error" , err : err})
    }
}

module.exports = onway