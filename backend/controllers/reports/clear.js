const db = require("../../utils/db")
const mailer = require('../../utils/mailer')
async function clear(req,res) {
    
    const reportId = req.params.id
    const resolution_action = req.body.selectReason
    const status = req.body.status
    const resolved_by = req.user.userId;

    
    const Schema = z.object({
        reportId : z.preprocess(val => val !== undefined ? Number(val) : undefined,z.number().optional()),
        resolution_action : z.enum(['Content Removed (Valid)','Content Removed (Invalid)','Listing Edited (Valid)','Listing Edited (Invalid)','Already Fixed (Valid)','Already Fixed (Invalid)','No Violation (Valid)','No Violation (Invalid)','Duplicate (Valid)','Duplicate (Invalid)','Other (Valid)','Other (Invalid)']),
        status : z.enum(['Sent','Responded','Removed'])
    });//defining schema for requests data

    function validateParams (data) {return Schema.safeParse(data)}; //definign functuon to valdiate data with schema provided
                
    const validateParamsResponse = validateParams({reportId , resolution_action, status}); //passing data to validator funciton 
    if(!validateParamsResponse.success) return res.status(400).json({message: "Invalid Credidentials"});  //returning error message if validation fails    
        

    try{
        // add node mailer to user whos report has been deleted

        const [data] = await db.query(`select reports.user_id, reports.content, reports.type, reports.status, reports.resolution_action, reports.resolved_by, reports.resolved_at, users.fullname from reports join users on reports.user_id = users.id where reports.id = ?`,[reportId]);
        
        if(data.length === 0) return res.status(404).json({message : "Report Not Found"});

        const row = data[0];

        await db.query('update reports set status = ?, resolution_action = ?, resolved_by = ? where id = ?',[status, resolution_action, resolved_by, reportId]);
                
        const html = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2 style="color: #333;">Report ${status}</h2>

                <p><strong>Report ID:</strong> ${reportId}</p>
                <p><strong>Type:</strong> ${row.type}</p>
                <p><strong>Content:</strong> ${row.content}</p>

                <hr style="margin: 16px 0;" />

                <p><strong>Status:</strong> ${status}</p>
                <p><strong>Resolution Action:</strong> ${resolution_action}</p>
                <p><strong>Resolved By:</strong> ${resolved_by}</p>
            </div>
        `; //html for mail

        mailer({
            to: row.email,
            subject: 'Report Removed',
            html,
        }).catch(console.error); //sending mail to customer with error catching


        return res.status(200).json({message : `Report ${status} Successfully`})
        
    }catch(err){
        return res.status(500).json({message : `Could Not ${status} Report. Try Later`})
    };
};

module.exports = clear; //exporting service