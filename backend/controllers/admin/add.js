const db = require('../../middlewares/db')

async function add (req,res) {
    try{

        const { id } = req.body
        // validate id
        
        const [ adminQuery ] = await db.query('insert into admin (id) values (?)' , Number(id))
        if(adminQuery.affectedRows === 0) return res.status(404).json({message : 'Invalid ID provided. Please try again later'})
        return res.status(200).json({message : 'New admin added successfully' , adminUser : id})

    }catch(err){

        if (err.code === 'ER_DUP_ENTRY') return res.status(400).json({ message: 'This User Is Already Admin' , id : req.body.id });
        return res.status(500).json({message: "Internal Error While Adding New Admin. Please try again later."});
    }
}

module.exports = add