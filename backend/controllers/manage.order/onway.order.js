const db = require('../../middlewares/db')

async function onway(req,res) {
    try{
        
        // const [ OnWayProducts ] = await db.query()
        // if(OnWayProducts.length < 1) return res.status(400).json({message : "No Products Beign Ordered" , products : []})

        // return res.status(200).json({message : "Products On Way" , products: OnWayProducts})

    }catch(err){
        console.log(err)
        return res.status(500).json({errMessage : "Internal Error" , err : err})
    }
}

module.exports = onway