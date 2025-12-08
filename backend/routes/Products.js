const express = require('express')
const ValidateToken = require('../config/ValidateToken')
const ValidateNewProduct = require('../schemas/NewProductSchema')
const ProductsRouter = express.Router()

const fs = require('fs')
const multer = require('multer')
const dest = multer({dest : '/uploads'})

ProductsRouter.post('/new-product' , ValidateToken, dest.array('images'), async (req,res) => {
    console.log(req.files);
console.log(req.body);

//validate text with zod schemas
//read files with fs
//push into db as json
//return response
//usese try/catch
})


module.exports = ProductsRouter