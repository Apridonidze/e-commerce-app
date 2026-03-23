const db = require('../../utils/db');

async function remove(req,res) {

    
    const productId = req.params.id; //defining request params
    if(!Number(productId)) return res.status(400).json({message : "Invalid Product Id"});//sending 400 stastus code if productId is invalid

    try{

        const [ response ] = await db.query('delete from cart where id = ? and product_id = ?' , [req.user.userId , productId]); //query to  remove item from cart
        
        if(response.affectedRows === 0) return res.status(404).json({message : 'Item Not Found In Your Cart'}); //sending 404 status code if no product has been afected in cart (so it means product was not in db)
        return res.status(200).json({message : "Product Removed From Cart Successfully"}); //sending 200 stautus code if item is removed from cart

    }catch(err){
        return res.status(500).json({message : "Could Not Remove Item From Cart. Try Later"}); //returning invalid message if internal error occurs
    };
};

module.exports = remove; //exporting service