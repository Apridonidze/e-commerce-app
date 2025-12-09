const express = require('express')
const ProductsRouter = express.Router()

const fs = require('fs')
const multer = require('multer')
const upload = multer({dest : '/uploads'})

const ValidateToken = require('../config/ValidateToken')
const NewProductSchema = require('../schemas/NewProductSchema')

const db = require('../config/db')

ProductsRouter.post('/' , ValidateToken, upload.fields([{name :'images', maxCount : 20}]), async (req,res) => {

    const validateProduct = NewProductSchema(req.body)
    

    if(!validateProduct.success) return res.status(400).json({errMessage : 'Invalid Input'})

    try{
        const product = req.body
        
        const files = req.files?.images;
        const filesBuffer = await Promise.all(files.map(file => fs.promises.readFile(file.path)));
        const base64 = filesBuffer.map(buffer => buffer.toString("base64"))


        await db.query('insert into products (id, images, title, description , category , subcategory) values (?,?,?,?,?,?)' , [req.user.userId , [JSON.stringify(base64)] , product.name , product.description , product.category , product.subCategory])
        return res.status(200).json({message : 'product added succsefully' , productDetails : `${product.name}${product.description}${product.category}${product.subCategory}`})

    }catch(err){
        return res.status(500).json({errMessage : 'Internal Error'  , err : err})
    }

})


module.exports = ProductsRouter