const db = require('../../middlewares/db')

async function add (req,res) {
    try{
        
        const [ adminQuery ] = await db.query('insert into admin (id) values (?)' , newAdmId)
        res.status(200).json({message : 'New Admin Successfully Added To List' , adminUser : adminQuery})

        // send user notification that they have been promoted as admin

    }catch(err){
        return res.status(500).json({errMessage : "Internal Error" , err : err})
    }
}

module.exports = add