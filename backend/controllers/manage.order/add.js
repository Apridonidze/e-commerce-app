const db = require('../../middlewares/db')

async function add(req,res) {
    try{

        const { order } = req.query

        const now = new Date()
        const date = now.toLocaleDateString('en-GB')

        const [ cartItems ] = await db.query('select * from cart where id = ? and product_id in ?' , [req.user.userId]) ; //add query here 
        if(cartItems.length < 1) return res.status(400).json({message : "No Items In Cart To Order"}) //
        
        await db.query('delete from cart where id = ?', [req.user.userId]) //delete this cart items from this table and move them into ordered_products with pending status 

        // const updateStatus = productIds.map(prod => db.query('update cart set status = ? set date = ? where product_id = ? and id = ?' , ['pending' , date ,prod , req.user.userId]))
        // const resp = updateStatus[0][0]

        // return res.status(200).json({message : "Your Items Has Been Ordered Successfully, Wait For Delivery", products : resp})

    }catch(err){
        return res.status(500).json({errMessage : "Internal Error" , err : err})
    }
}

module.exports = add