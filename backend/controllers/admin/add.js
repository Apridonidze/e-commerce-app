const db = require('../../utils/db'); //importing db middleware

async function add (req,res) {
    
    const { id } = req.body; //getting data from req body
    if(!Number(id)) return res.status(400).json({message : "Invalid User Id Format"}); //validating if id is number

    try{

        const [ adminQuery ] = await db.query('insert into admin (id) values (?)' , Number(id)); //inserting id into admin table

        if(adminQuery.affectedRows === 0) return res.status(404).json({message : 'Invalid ID provided. Please try again later'}); //returning 404 status eror insertion fails because of id
        return res.status(200).json({message : 'New admin added successfully' , adminUser : id}); //returning 200 status code if success

    }catch(err){
        if (err.code === 'ER_DUP_ENTRY') return res.status(400).json({ message: 'This User Is Already Admin' , id : req.body.id }); //returns 400 status message if user id is duplicated in db
        return res.status(500).json({message: "Internal Error While Adding New Admin. Please try again later."}); //returns 500 status message for other internal errors
    }
}

module.exports = add; //exporting service