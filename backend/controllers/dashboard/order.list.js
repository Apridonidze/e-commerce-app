async function  orderList (req,res) {
    try{
        const orderStatus = req.params.status
        const offset = req.params.offset || 0;

        const limit = 15;
        

    }catch(err){
        console.log(err)
        return res.status(500).json({message : "Internal Error" , err})
    }
}

module.exports = orderList