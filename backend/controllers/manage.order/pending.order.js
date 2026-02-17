async function pending(req,res) {
     try{
    
        const [ PendingProducts ] = await db.query('select products.* , cart.* , users.id , users.fullname , users.email from cart join products on cart.product_id = products.products_id join users on products.id = users.id where cart.status = ?' , 'pending')
        if(PendingProducts.length < 1) return res.status(400).json({message : "No Products Beign Ordered" , products : []})

        return res.status(200).json({message : "Ordered Products" , products : PendingProducts})


    }catch(err){
        return res.status(500).json({errMessage : 'Internal Error' , err : err})
    }
}

module.exports = pending