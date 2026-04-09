const db = require("../../utils/db");

async function remove (req,res){

    if(!Number(req.params.id)) return res.status(400).json({message : "Invalid Address Id"}) 

    try{

        const { id } = req.params;

        const [ row ] = await db.query('delete from address where id = ?' , [ id ]);
        if(row.affectedRows === 0) return res.status(400).json({message : "Address Id Not Found"})

        return res.status(200).json({message : "Address Removed Succesfully"})

    }catch(err){
        return res.status(500).json({message : "Could Not Remove Your Address. Try Later!"})
    }
}

module.exports = remove;