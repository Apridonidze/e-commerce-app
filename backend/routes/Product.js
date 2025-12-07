const express = require('express')
const ProductRouter = express.Router()

ProductRouter.post('/new-product' , (req,res) => {
    console.log(req.body)
})


module.exports = ProductRouter