const db = require("../../utils/db")

async function clear(req,res) {
    
    const reportId = req.params.id
    const resolution_action = req.body.selectReason
    const status = req.body.status
    const resolved_by = req.user.userId;

    
    const Schema = z.object({
        resolution_action : z.enum(['Content Removed (Valid)','Content Removed (Invalid)','Listing Edited (Valid)','Listing Edited (Invalid)','Already Fixed (Valid)','Already Fixed (Invalid)','No Violation (Valid)','No Violation (Invalid)','Duplicate (Valid)','Duplicate (Invalid)','Other (Valid)','Other (Invalid)']),
        reportId : z.preprocess(val => val !== undefined ? Number(val) : undefined,z.number().optional()),
        status : z.enum(['Sent','Responded','Removed'])
    });//defining schema for requests data
                
    function validateParams (data) {return Schema.safeParse(data)}; //definign functuon to valdiate data with schema provided
                
    const validateParamsResponse = validateParams({reportId , resolution_action, status}); //passing data to validator funciton 
    if(!validateParamsResponse.success) return res.status(400).json({message: "Invalid Credidentials"});  //returning error message if validation fails    
        

    try{
        // add node mailer to user whos report has been deleted
        
        const [ response ] = await db.query('update reports set status = ?, resolution_action = ?, resolved_by = ? WHERE id = ?',[status, resolution_action, resolved_by, reportId]);
        if(response.affectedRows === 0) return res.status(404).json({message : 'Invalid Credidentials'})

        return res.status(200).json({message : `Report ${status} Successfully` , reportId })
        
    }catch(err){
        console.log(err)
        return res.status(500).json({message : "Interla Error" , err})
    }

}

module.exports = clear