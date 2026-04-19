const db = require('../../utils/db'); //importing db utility 

async function fullList(req, res) {

    let { offset = 0, status } = req.params; //definig request data
    const limit = 5; //limit for query

    offset = Number(offset); //defining offset as number

    if (Number.isNaN(offset) || offset < 0) {return res.status(400).json({ message: "Invalid offset" })};
    if (status == "undefined") status = undefined; //validating status and offset

    try {

        let query = `select u.fullname as user_fullname , u.email as user_email , a.email as admin_email , reports.* , products.title , products.products_id from reports join users u on u.id = reports.user_id left join users a on a.id = reports.resolved_by left join products on reports.product_id = products.products_id`; //main query
        const params = []; //params array

        if (status) { //if status is defined statement runs
            query += ` where reports.status = ?`; //adding to main query
            params.push(status); //pushin status as params 
        };

        // if status is not defined
        query += ` limit ? offset ?`; //directly adding limit to main query without where
        params.push(limit, offset); //pushing limit and offset in params array

        const [ReportsList] = await db.query(query, params); //executting query

        if (ReportsList.length === 0) return res.status(204).send();//sending 204 status code if no reports have been found 
        return res.status(200).json({message: "Reports Found",reports: ReportsList}); //sending 200 status code if reports has beeen found

    } catch (err) {
        return res.status(500).json({message: "Could Not Fetch Reports. Try Later"}); //returning internal error message
    };
};

module.exports = fullList; //exporting service