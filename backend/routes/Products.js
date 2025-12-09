const express = require('express')
const ValidateToken = require('../config/ValidateToken')
const ValidateNewProduct = require('../schemas/NewProductSchema')
const ProductsRouter = express.Router()

const fs = require('fs')
const multer = require('multer')
const upload = multer({dest : '/uploads'})

const db = require('../config/db')

ProductsRouter.post('/' , ValidateToken, upload.fields([{name :'images', maxCount : 20}]), async (req,res) => {
    try{
        
        const files = req.files?.images;
        const filesBuffer = await Promise.all(files.map(file => fs.promises.readFile(file.path)));
        const base64 = filesBuffer.map(buffer => buffer.toString("base64"))

        await db.query()
        

    }catch(err){
        return res.status(500).json({errMessage : 'Internal Error'  , err : err})
    }

})


module.exports = ProductsRouter