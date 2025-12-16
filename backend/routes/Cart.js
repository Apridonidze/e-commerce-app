const express = require('express');
const CartRouter = express.Router();

const ValidateToken = require('../config/ValidateToken');
const db = require('../config/db')

CartRouter.get('/' , ValidateToken , async(req,res) => {
    try{
        
        const [ cartItems ] = await db.query('select * from cart where id = ?' , req.user.userId)

        if(cartItems.length < 1) return res.status(400).json({message : 'No Items In Cart', products : []})
        
        return res.status(200).json({message : 'Found Items In Your Cart' , products : cartItems})

    }catch(err){
        return res.status(500).json({errMessage : 'Internal Error' , err : err})
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
        
        await db.query('insert into cart (id, product_id) values (?,?)' , [req.user.userId , productId])
        return res.status(200).json({message : "Prodcut Added In Cart Successfully"})

    }catch(err){
        return res.status(500).json({errMessage : "Internal Error" , err : err})
    }

})


module.exports = CartRouter