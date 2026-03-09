const db = require('../../middlewares/db')

async function delivered(req,res) {
    try{

        const [ DeliveredProducts ] = await db.query()
        if(DeliveredProducts.length < 1) return res.status(204)

        return res.status(200).json({message : "Delivered Products Found" , products: DeliveredProducts})

    }catch(err){
        console.log(err)
        return res.status(500).json({errMessage : "Internal Error" , err : err})
    }
}

module.exports = delivered