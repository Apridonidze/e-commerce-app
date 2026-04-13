const db = require('../../utils/db'); //importing db utility

async function list(req,res) {
    try{

        const [orders] = await db.query("select orders.*, address.* from orders join address on orders.address = address.id where orders.user_id = ?" , [req.user.userId]); //fetching order items with joins with products table 
        
        if(orders.length === 0) return res.status(204).send(); //sending 204 status code if order.length === 0
        return res.status(200).json({message : 'Orders Fetched Successfully' , orders}); //sending 200 status code if orders are found

    }catch(err){
        return res.status(500).json({message: "Could Not Fetch Orders. Try Later"});//returning internal errorr 
    };
};

module.exports = list;//exporting service