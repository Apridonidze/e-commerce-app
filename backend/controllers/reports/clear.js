const db = require("../../middlewares/db")

async function clear(req,res) {
    
    const reportId = req.params.id
    const resolution_action = req.body.selectReason
    const status = 'Removed'
    const resolved_by = req.user.userId;

    try{

        await db.query('update reports set status = ? , resolution_action = ? , resolved_by = ? where id = ?' , [status, resolution_action, resolved_by , reportId])
        // add node mailer to user whos report has been deleted
        return res.status(200).json({message : "Report Deleted Successfully" , reportId })
    }catch(err){
        console.log(err)
        return res.status(500).json({message : "Interla Error" , err})
    }

}

module.exports = clear