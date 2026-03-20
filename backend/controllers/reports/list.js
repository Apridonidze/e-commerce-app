const db = require('../../middlewares/db')

async function list(req,res) {
    try{

        const { offset } = req.params || 0;
        const limit = 5;

        
        //filter req.params to be number if not return 400 status code error

        const [ ReportsList ] = await db.query('select users.fullname , users.email, reports.* , products.title , products.products_id from reports join users on users.id = reports.user_id left join products on reports.product_id = products.products_id where status = ? limit ?' , ["Sent" , Number(offset) + limit])
        if(ReportsList.length === 0) return res.status(204)

        return res.status(200).json({message : "Reports Found" , reports : ReportsList})
        
    }catch(err){
        console.log(err)
        return res.status(500).json({errMessage : "Internal Erorr" , err : err})
    }
}


module.exports = list