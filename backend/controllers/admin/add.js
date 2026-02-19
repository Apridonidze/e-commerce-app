const db = require('../../middlewares/db')

async function add (req,res) {
    try{
        
        const [ adminQuery ] = await db.query('insert into admin (id) values (?)' , newAdmId)
        return res.status(200).json({message : 'New Admin Successfully Added To List' , adminUser : adminQuery})

        //create new user from here and sign token for them (only give them id, fullname,. email and password , phone number is not needed)

    }catch(err){
        return res.status(500).json({errMessage : "Internal Error" , err : err})
    }
}

module.exports = add