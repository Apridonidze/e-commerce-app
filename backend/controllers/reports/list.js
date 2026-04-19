const db = require('../../utils/db'); //importing db utility

async function list(req,res) {

    let { offset } = req.params || 0; //defining request params
    const limit = 5; //limit for query offset
    
    offset = Number(offset); //defining offset as number
    if (Number.isNaN(offset) || offset < 0) {return res.status(400).json({ message: "Invalid offset" })}; //validating offset

    try{

        const [ReportsList] = await db.query('select u.fullname as user_fullname , u.email as user_email , reports.* , products.title , products.products_id from reports join users u on u.id = reports.user_id left join products on reports.product_id = products.products_id where reports.status = ? limit ?', ["Sent", Number(offset) + limit]);
        
        if(ReportsList.length === 0) return res.status(204).send(); //returnign 204 status code if reportlist  length is 0
        return res.status(200).json({message : "Reports Found" , reports : ReportsList}); //returnign report list if reports are found
        
    }catch(err){
        return res.status(500).json({message : "Could Not Fetch Reports. Try Later"}); //returning internal error message
    };
};

module.exports = list;//exporting service