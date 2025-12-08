const express = require('express')
const ValidateToken = require('../config/ValidateToken')
const ValidateNewProduct = require('../schemas/NewProductSchema')
const ProductsRouter = express.Router()

const multer = require('multer')
const dest = multer({dest : '/uploads'})

ProductsRouter.post('/new-product' , ValidateToken, dest.array('images'), async (req,res) => {
    console.log(req.files);
console.log(req.body);

})


module.exports = ProductsRouter