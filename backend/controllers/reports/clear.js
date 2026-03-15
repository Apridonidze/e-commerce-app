const db = require("../../middlewares/db")

async function clear(req,res) {
    
    const reportId = Number(req.params.id)
    const resolution_action = req.body.selectReason
    const status = req.body.status
    const resolved_by = req.user.userId;

    try{
        // add node mailer to user whos report has been deleted
        
        await db.query('update reports set status = ?, resolution_action = ?, resolved_by = ? WHERE id = ?',[status, resolution_action, resolved_by, reportId]);
        return res.status(200).json({message : `Report ${status} Successfully` , reportId })
        
    }catch(err){
        console.log(err)
        return res.status(500).json({message : "Interla Error" , err})
    }

}

module.exports = clear