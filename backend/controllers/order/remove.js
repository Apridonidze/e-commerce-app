const db = require('../../utils/db'); //importing db utility

async function remove(req,res) {

    const { id } = req.params; //defining request params
    if(!Number(id) || id <= 0) return res.status(400).json({message : "Invalid Order Id Format."}); //validating request param
    
    try{

        const [ response ] = await db.query('delete from orders where user_id = ? and order_id = ?' , [req.user.userId, Number(id)]); //deleting orders from table
        
        if(response.affectedRows === 0) return res.status(404).json({message : "Order Not Found"}); //checking if query affected any rows. if not then order did not existed and returning 404 status code error
        return res.status(200).json({message : "Order Deleted", orderId : Number(id)}); //returrning success message

    }catch(err){
        return res.status(500).json({message : "Could Not Delete Order. Try Later"}); //returning internal error message
    };
};

module.exports = remove;//exporting service