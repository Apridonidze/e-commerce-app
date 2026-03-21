const db = require('../../middlewares/db')

async function add (req,res) {
    try{
        // get admin id from req
        
        const [ adminQuery ] = await db.query('insert into admin (id) values (?)' , newAdmId)
        if(adminQuery.affectedRows === 0) return req.status(404).json({message : 'Invalid ID provided. Please try again later'})
        return res.status(200).json({message : 'New admin added successfully' , adminUser : adminQuery.insertId})

    }catch(err){
        if(err.code === 'ER_DUP_ENTRY'){
            if(err.message.includes('admin.id'))return res.status(400).json({message : 'This User Is Already Admin'})
        }
            // add db rollback if errro happens
        return res.status(500).json({message : "Internal Error While Adding New Admin. Please try again later."})
    }
}

module.exports = add