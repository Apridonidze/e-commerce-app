const db = require('../../utils/db');

async function add(req,res) {

    const amount = req.body.amount;
    const productId = req.params.id; //defining data from request

    if(!Number(productId) || productId <= 0) return res.status(400).json({message : "Invalid Product Id Format."});
    if(!Number(amount) || amount <= 0) return res.status(400).json({message : "Invalid Amount Format."}); //validating data and returnign 400 status code error if validation fails

    try{

        const [ response ] = await db.query('insert into cart (id, product_id, amount) values (?,?,?)' , [req.user.userId , productId , amount]); //inserting item into cart table

        if(response.affectedRows === 0) return res.status(400).json({message : "Could Not Save Item In Cart"}); //returnign error message if no rows are affected after query mount
        return res.status(200).json({message : "Product Added In Cart Successfully"}); //returning 200 status code message iif query successs

    }catch(err){
        if(err.code === 'ER_DUP_ENTRY') return res.status(400).json({message : 'Product Is Already In Cart'}); //returngi error for duplicate items save
        return res.status(500).json({message : "Could Not Add Items Into Cart. Try Later"}); //returnign error for any other internal errors
    };
};

module.exports = add; //exporting service