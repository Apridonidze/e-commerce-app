const db = require('../../middlewares/db')

async function list (req,res) {
    try{

        const [ AdminList ] = await db.query('select users.id, users.fullname, users.email from admin join users on admin.id = users.id')
        if(AdminList.length < 1) return res.status(400).json({message : 'No Admins Found', adminList : []})

        return res.status(200).json({message : 'Admins Found' , adminList : AdminList})

    }catch(err){
        return res.status(500).json({errMessage : "Internal Error" , err : err})
    }
} 


module.exports = list