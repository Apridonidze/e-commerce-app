const express = require('express');
const CartRouter = express.Router();

const ValidateToken = require('../config/ValidateToken');
const db = require('../config/db')

CartRouter.get('/' , ValidateToken , async(req,res) => {
    try{
        
        const [ cartItems ] = await db.query('select * from cart join products on cart.product_id = products.products_id where cart.id = ?' , [req.user.userId])

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

        const [ isAlreadyInCart ] = await db.query('select product_id from cart where id = ? and product_id = ?' , [req.user.userId , productId])
        if(isAlreadyInCart.length !== 0) return res.status(400).json({message : "You Already Have This Item In Your Cart"})
        
        await db.query('insert into cart (id, product_id) values (?,?)' , [req.user.userId , productId])
        return res.status(200).json({message : "Product Added In Cart Successfully"})

    }catch(err){
        return res.status(500).json({errMessage : "Internal Error" , err : err})
    }

})


CartRouter.delete('/:id' , ValidateToken , async (req, res) => {
    try{

        const productId = req.params.id

        if(!Number(productId)) return res.status(400).json({message : "Invalid Product Id"})

        const [ isInCart ] = await db.query('select product_id from cart where id = ? and product_id = ?' , [req.user.userId , productId])
        if(isInCart.length === 0) return res.status(400).json({message : "You Do Not Have This Item In Your Cart"})
        
        await db.query('delete from cart where id = ? and product_id = ?' , [req.user.userId , productId])
        return res.status(200).json({message : "Product Removed From Cart Successfully"})

    }catch(err){
        return res.status(500).json({errMessage : "Internal Error" , err : err})
    }
})

CartRouter.post('/order-cart-items' , ValidateToken , async (req,res) => {
    try{

        const { order } = req.query

        const now = new Date()
        const date = now.toLocaleDateString('en-GB')

        const [ cartItems ] = await db.query('select * from cart where id = ? and product_id in ?' , [req.user.userId]) ; //add query here 
        if(cartItems.length < 1) return res.status(400).json({message : "No Items In Cart To Order"}) //
        
        await db.query('delete from cart where id = ?', [req.user.userId]) //delete this cart items from this table and move them into ordered_products with pending status 

        // const updateStatus = productIds.map(prod => db.query('update cart set status = ? set date = ? where product_id = ? and id = ?' , ['pending' , date ,prod , req.user.userId]))
        // const resp = updateStatus[0][0]

        // return res.status(200).json({message : "Your Items Has Been Ordered Successfully, Wait For Delivery", products : resp})

    }catch(err){
        return res.status(500).json({errMessage : "Internal Error" , err : err})
    }
})

module.exports = CartRouter