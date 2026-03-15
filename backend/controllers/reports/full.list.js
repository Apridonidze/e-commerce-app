const db = require('../../middlewares/db')

async function fullList (req,res) {
    try{

        const { offset } = req.params || 0;
        const limit = 5;
        const { status }= req.params || undefined;
        //filter req.params to be number if not return 400 status code error

        let query = 'select users.fullname , users.email, reports.* , products.title from reports join users on users.id = reports.user_id  join products on reports.product_id = products.products_id'
        const params = [] 

        if(status){
            query += ' where reports.status = ?'
            params.push(status)
        }

        query += ' LIMIT ? OFFSET ?';
        params.push(limit, Number(offset));

        const [ReportsList] = await db.query(query, params);

        // const [ ReportsList ] = await db.query('select users.fullname , users.email, reports.* , products.title from reports join users on users.id = reports.user_id  join products on reports.product_id = products.products_id where status = ? limit ?' , [status, Number(offset) + limit])
        if(ReportsList.length === 0) return res.status(204)

        return res.status(200).json({message : "Reports Found" , reports : ReportsList})

    }catch(err){
        console.log(err)
        return res.status(500).json({message : "Interla Error" , err})
    }
} 

module.exports = fullList