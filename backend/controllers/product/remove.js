const db = require('../../utils/db'); //importing db utility

async function remove(req,res) {

    const { id } = req.params; //defining params from request
    if(!Number(id) || id <= 0) return res.status(400).json({message : "Invalid Product Id Format."}); //validating request params

    try{

        const [ response ] = await db.query('delete from products where products_id = ?' , [Number(id)]);//deleting product from db

        if(response.affectedRows === 0) return res.status(404).json({message : "Product Not Found"});  //returning 404 status code if rows are not affected 
        return res.status(200).json({message : "Product Removed Successfully" , productId : id}); // returning 200 status code if query success

    }catch(err){
        return res.status(500).json({message : "Could Not Remove Product. Try Later"}); //sending 500 status code error if internal error occurs
    };
};

module.exports = remove;//exporting sevice