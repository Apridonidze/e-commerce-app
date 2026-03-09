const db = require('../../middlewares/db')

async function pending(req,res) {
     try{
    
        const [ PendingProducts ] = await db.query()
        if(PendingProducts.length < 1) return res.status(400).json({message : "No Products Beign Ordered" , products : []})

        return res.status(200).json({message : "Ordered Products" , products : PendingProducts})


    }catch(err){
        console.log(err)
        return res.status(500).json({errMessage : 'Internal Error' , err : err})
    }
}

module.exports = pending