async function add (req,res) {
    try{
        const newAdmId = req.params.id

        const [ isAlreadyAdmin ] = await db.query('select admin.id from admin join users on admin.id = users.id where users.id = ?', newAdmId)
        if(isAlreadyAdmin.length > 0)return res.status(400).json({message : "User Already Has Admin Role", adminUser : isAlreadyAdmin})
        
        const [ adminQuery ] = await db.query('insert into admin (id) values (?)' , newAdmId)
        return res.status(200).json({message : 'New Admin Successfully Added To List' , adminUser : adminQuery})

    }catch(err){
        return res.status(500).json({errMessage : "Internal Error" , err : err})
    }
}

module.exports = add