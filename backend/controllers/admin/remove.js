const db = require('../../utils/db'); //importing db middleware

async function remove (req,res) {

    const admId = req.params.id; //getting params from request
        
    if(!Number(admId)) return res.status(400).json({message : "Invalid Admin User Id Format"}); //validating id type to be number
    if(req.user.userId == admId)return res.status(400).json({message : 'You can not remove yourself from admin list'}); //returnign error message if admin tries to remove theirselves from admin list
    
    try{

        const [ query ] = await db.query('delete from admin where id = ?' , Number(admId)); //delete query

        if(query.affectedRows === 0) return res.status(404).json({message : "Admin Not Found"}); //returnign 404 status code error if no admin is affected by query
        return res.status(200).json({message : 'Admin removed successfully' , admId}); //returning 200 status code error if admin list is modiefied successfully

    }catch(err){
        return res.status(500).json({message : "Could Not Remove Admin. Try Later"}); //returning 500 status code errors
    };
};


module.exports = remove; //exporting service