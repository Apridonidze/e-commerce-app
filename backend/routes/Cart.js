const express = require('express');
const CartRouter = express.Router();

const ValidateToken = require('../config/ValidateToken');
const db = require('../config/db')

CartRouter.get('/' , ValidateToken , async(req,res) => {
    try{
        
        const [ cartItems ] = await db.query('select * from cart join products on cart.product_id = products.products_id where products_id = ?' , req.user.userId)

        if(cartItems.length < 1) return res.status(400).json({message : 'No Items In Cart', products : []})
        
        return res.status(200).json({message : 'Found Items In Your Cart' , products : cartItems})

    }catch(err){
        return res.status(500).json({errMessage : 'Internal Error While Fetching cart items' , err : err})
    }
})


CartRouter.post('/:id' , ValidateToken , async (req, res) => {
    
    try{

        const productId = req.params.id

        if(!Number(productId)) return res.status(400).json({message : "Invalid Product Id"})

        const [ doesProductExists ] = await db.query('select * from products where products_id = ?' , productId)
        if(doesProductExists.length < 1) return res.status(400).json({message : 'Product Does Not Exists In Database'})

        const [ isAlreadyInCart ] = await db.query('select * from cart where id = ? and product_id = ?' , [req.user.userId , productId])
        if(isAlreadyInCart.length > 0) return res.status(400).json({message : "You Already Have This Item In Your Cart"})
        
        await db.query('insert into cart (id, product_id, status) values (?,?,?)' , [req.user.userId , productId , 'none'])
        return res.status(200).json({message : "Prodcut Added In Cart Successfully"})

    }catch(err){
        return res.status(500).json({errMessage : "Internal Error" , err : err})
    }

})

CartRouter.post('/order-cart-items' , ValidateToken , async (req,res) => {
    try{
        //check if items amount are not 
        const now = new Date()
        const date = now.toLocaleDateString('en-GB')

        const [ cartItems ] = await db.query('select * from cart where id = ? and status = ?' , [req.user.userId , 'none'])
        if(cartItems.length < 1) return res.status(400).json({message : "No Items In Cart To Order"})

        const productIds = cartItems.map(item => item.product_id)
        const updateStatus = productIds.map(prod => db.query('update cart set status = ? set date = ? where product_id = ? and id = ?' , ['pending' , date ,prod , req.user.userId]))
        const resp = updateStatus[0][0]

        return res.status(200).json({message : "Your Items Has Been Ordered Successfully, Wait For Delivery", products : resp})

    }catch(err){
        return res.status(500).json({errMessage : "Internal Error" , err : err})
    }
})

module.exports = CartRouter