async function update(req,res) {
    try{

        const prodId = req.params.id
        const clientId = req.params.userId
        const status = req.params.status

        const [ DoesProductExists ] = await db.query('select products.* , users.id , users.fullname , cart.* join users on products.id =  users.id join users on cart.id = users.id where products.product_id = ? and user.id = ?' , [prodId, clientId])
        if(DoesProductExists.length < 1) return res.status(400).json({message : 'No Products Found With This ID Under This Users Name' , products : []})
        
        await db.query("update table cart set status = ? where id = ? and product_id = ?" , [status, clientId , prodId])
        return res.status(200).json({message : 'Users Product Updated Successfully' , data : {status : status , clientId : clientId , productId : prodId}})

        //send user mail as status of users product changes and notification

    }catch(err){
        return res.status(500).json({errMessage : "Internal Error While Updating Products Status" , err : err})
    }
}

module.exports = update