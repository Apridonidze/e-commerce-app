async function customerList (req,res) {
    try{

        

    }catch(err){
        return res.status(500).json({message : "Internal Error" , err})
    }
}


module.exports = customerList;