const db = require('../../middlewares/db')

async function remove (req,res) {
    try{
        
        const admId = req.params.id
        
        const [ query ] = await db.query('delete from admin where id = ?' , Number(admId))

        if(query.affectedRows === 0) return res.status(404).json({message : "Admin Not Found"})
        return res.status(200).json({message : 'Admin removed successfully' , admId})

    }catch(err){
        return res.status(500).json({errMessage : "Internal Error" , err : err})
    }
} 


module.exports = remove