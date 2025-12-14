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

CartRouter.post('/' , ValidateToken , async (req, res) => {
    res.send('Cart Post Api Endpoint')
})

module.exports = CartRouter