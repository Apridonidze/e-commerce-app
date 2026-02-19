const db = require('../../middlewares/db')

async function check (req,res) {
    try{
        //add checking hjere copy/paste from isAdmin middleware
    }catch(err){
        return res.status(500).json({errMessage : "Internal Error" , err : err})
    }
}

module.exports = check