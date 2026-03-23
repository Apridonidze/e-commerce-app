const db = require('../../utils/db'); //importing db utility

async function list(req,res) {
    try{

        let { offset = 0, status } = req.params; //defining params
        const limit = 10; //defining limit for db offset and limit

        offset = Number(offset) ; //defining offset as number type

        if (Number.isNaN(offset) || offset < 0) {return res.status(400).json({ message: "Invalid offset" })}; //checking if number type of offset is valid or not
        if (status == "undefined") status = undefined; //defining status as undefined if status is not provided

        let query = `select feedback.*, users.fullname, products.title from feedback join users on users.id = feedback.id left join products on products.products_id = feedback.product_id`; //querys body
        const params = []; //params array

        if (status) {
            query += ` where feedback.type = ?`; //adding query to main query
            params.push(status); //adding status intop params array if defined
        }; //checking is status is defined

        query += ` limit ? offset ?`; //adding limit and offset query to main query after status query update
        params.push(limit, offset); //adding query limit to main query

        const [ feedbacks ] = await db.query(query, params); //executing formatted query
        
        if(feedbacks.length === 0) return res.status(204).send(); //returning 204 status code if feedbacks are not found
        return res.status(200).json({message : "Feedbacks Found" , feedbacks}); //returning 200 status code if feedbacks exists 

    }catch(err){
        return res.status(500).json({message: "Could Not Get Feedbacks. Try Later"});//returning internal error message
    };
};

module.exports = list;//exporting service