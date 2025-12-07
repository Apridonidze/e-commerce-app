const express = require('express')
const ProductsRouter = express.Router()

ProductsRouter.post('/new-product' , (req,res) => {
    console.log(req.body)
})


module.exports = ProductsRouter