const express = require('express');
const CartRouter = express.Router();

const ValidateToken = require('../config/ValidateToken');


CartRouter.get('/' , ValidateToken , async(req,res) => {
    res.send('Cart Get Api EndPoint')
})

CartRouter.post('/' , ValidateToken , async (req, res) => {
    res.send('Cart Post Api Endpoint')
})

module.exports = CartRouter