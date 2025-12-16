
const db = require('../config/db')

async function isAdmin ( req , res , next) {
    try{

        const id = req.user.userId

        const [ doesUserExists ] = await db.query('select id from users where id = ?' , id)
        if(doesUserExists.length < 1) return res.status(400).json({message : "User Not Found" , isAdmin : false})

        const [ isAdmin ] = await db.query('select id from admin where id = ?' , id)
        if(isAdmin.length < 1) return res.status(400).json({message : "Access Declined" , isAdmin : false})

        next();

    }catch(err){
        return res.status(500).json({errMessage : "Internal Error" , err : err})
    }
    
}

module.exports = isAdmin