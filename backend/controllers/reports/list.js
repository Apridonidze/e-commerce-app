const db = require('../../middlewares/db')

async function list(req,res) {
    try{

        const { offset } = req.params;
        const limit = 15;

        //add filters for params

        const [ ReportsList ] = await db.query('select users.fullname , users.email, reports.* from reports join users on users.id = reports.user_id limit ?' , [Number(offset) + limit])
        if(ReportsList.length === 0) return res.status(204)

        return res.status(200).json({message : "Reports Found" , reports : ReportsList})
        
    }catch(err){
        console.log(err)
        return res.status(500).json({errMessage : "Internal Erorr" , err : err})
    }
}


module.exports = list