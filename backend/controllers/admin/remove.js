const db = require('../../middlewares/db')

async function remove (req,res) {
    try{
        const admId = req.params.id
        
        await db.query('delete from admin where id = ?' , admId)
        return res.status(200).json({message : 'New Admin Successfully Added To List' , admId : admId})

        //delete admin user
    }catch(err){
        return res.status(500).json({errMessage : "Internal Error" , err : err})
    }
} 


module.exports = remove