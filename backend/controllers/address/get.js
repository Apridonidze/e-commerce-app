const db = require("../../utils/db");

async function get (req,res){
    try{

        const [ row ] =  await db.query('select * from address where user_id = ?' , [ req.user.userId ]);
    
        if(row.length === 0) return res.status(204).send();
        return res.status(200).json({message : "Address Found Successfully" , addresses : row});

    }catch(err){
        return res.status(500).json({message : "Could Not Found Your Saved Addresses. Try Later!"})
    }
}

module.exports = get;