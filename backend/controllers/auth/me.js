const db = require('../../middlewares/db')

async function me(req,res) {
    try{

        const id = req.user.userId

        const [ user ] = await db.query('select id ,fullname, email,country_code, phone  from users where id = ?' , id)
        const [ isAdmin ] = await db.query('select id from admin where id = ?' , id)

        if(user.length < 1) return res.status(404).json({errMessage : "User Not Found" , user : null})
        return res.status(200).json({message : 'User Found' , user : user[0] , role : isAdmin.length === 0 ? 'user' : 'admin'})


    }catch(err){
        return res.status(500).json({errMessage : 'Internal Error'  , err : err})
    }
}


module.exports = me