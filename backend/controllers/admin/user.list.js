const db = require('../../middlewares/db')

async function userList (req,res){
    try{

        let user = req.query.targetUser;
        // validate input
        
        const [ response ] = await db.query('select id, fullname, email from users where lower(users.fullname) like ? or lower(users.email) like ?' , [ `%${user}%`, `%${user}%` ])

        if(response.length === 0) return res.status(204).send()
        
        return res.status(200).json({message : "User Found" , users : response})

    }catch(err){
        return res.status(500).json({message : "Internal Error"})
    }
}

module.exports = userList