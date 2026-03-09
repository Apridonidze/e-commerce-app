async function remove(req,res) {
    try{

        const prodId = req.params.id
        const clientId = req.params.userId

        // remove order + order_items where order_id = ? 
        // send user mail that their order has been removed with the admins note why it happened

    }catch(err){
        return res.status(500).json({message : "Internal errorr" , err})
    }
}

module.exports = remove