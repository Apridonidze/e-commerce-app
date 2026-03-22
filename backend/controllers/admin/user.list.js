const db = require('../../middlewares/db'); //importing db middleware
const UserSearchSchema = require('../../schemas/UserSearchSchema');

async function userList (req,res){

    
    const ValidateSearchInput = UserSearchSchema(req.query)
    if(!ValidateSearchInput.success) return res.status(400).json({message : "Invalid Search Input Credidentials"})
    
    try{
            
        const user = req.query.targetUser; //defining request's query

        const [ response ] = await db.query('select id, fullname, email from users where lower(users.fullname) like ? or lower(users.email) like ?' , [ `%${user}%`, `%${user}%`]); //selecting users data from db similar to request query content

        if(response.length === 0) return res.status(204).send(); //sending 204 statsu code error if no similar user found
        return res.status(200).json({message : "User Found" , users : response}); //sending users if found with 200 status code 

    }catch(err){
        return res.status(500).json({message : "Could Not Fetch Users. Try Later"});
    };
};

module.exports = userList; ///exporingin service