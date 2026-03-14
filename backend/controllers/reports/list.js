const db = require('../../middlewares/db')

async function list(req,res) {
    try{

        const { offset } = req.params;
        const limit = 15;
        
        const [ ReportsList ] = await db.query('select users.fullname , users.id , users.email, reports.* from reports join users on users.id = reports.id')
        if(ReportsList.length < 1) return res.status(400).json({message : "No Reports Yet." , reports : ReportsList})

        return res.status(200).json({message : "Reports Found" , reports : ReportsList})
        
    }catch(err){
        console.log(err)
        return res.status(500).json({errMessage : "Internal Erorr" , err : err})
    }
}


module.exports = list