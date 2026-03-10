async function check(req,res) {
    try{

    }catch(err){
        return res.status(500).json({message : "Internal Error" , err})
    }
}

module.exports = check