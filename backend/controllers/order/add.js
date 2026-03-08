const db = require('../../middlewares/db')

async function add(req,res) {
    try{

        const items = req.body.selectedItems

        const now = new Date()
        const date = now.toLocaleDateString('en-GB')

        const item = items.map((item) => item.id)
        console.log(item)
        

        // const updateStatus = productIds.map(prod => db.query('update cart set status = ? set date = ? where product_id = ? and id = ?' , ['pending' , date ,prod , req.user.userId]))
        // const resp = updateStatus[0][0]

        // return res.status(200).json({message : "Your Items Has Been Ordered Successfully, Wait For Delivery", products : resp})

    }catch(err){
        console.log(err)
        return res.status(500).json({errMessage : "Internal Error" , err : err})
    }
}

module.exports = add