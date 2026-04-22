async function lowStock(req,res) {
    try{

    }catch(err){
        return res.status(500).json({message : "Could Not Fetch Low Stock Items. Try Later"})
    }
}

module.exports = lowStock