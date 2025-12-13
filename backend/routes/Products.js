const express = require('express')
const ProductsRouter = express.Router()

const fs = require('fs')
const multer = require('multer')
const upload = multer({dest : '/uploads'})

const ValidateToken = require('../config/ValidateToken')
const NewProductSchema = require('../schemas/NewProductSchema')

const db = require('../config/db')

const RateLimiter = require('../config/RateLimiter')

ProductsRouter.post('/' , ValidateToken, RateLimiter ,upload.fields([{name :'images', maxCount : 20}]), async (req,res) => {

    const product = req.body

    const parsedRequest = {
        name : product.name.toString(),
        description : product.description.toString(),
        price : Number(product.price),
        category : product.category.toString(),
        subCategory : product.subCategory.toString(),
    }

    const validateProduct = NewProductSchema(parsedRequest)

    if(!validateProduct.success) return res.status(400).json({errMessage : 'Invalid Input'})

    try{
        
        const files = req.files?.images;
        const filesBuffer = await Promise.all(files.map(file => fs.promises.readFile(file.path)));
        const base64 = filesBuffer.map(buffer => buffer.toString("base64"))

        const [isAlreadyAdded] = await db.query('select * from products where id = ? and title = ?' , [req.user.userId , product.name])

        if(isAlreadyAdded.length > 0) return res.status(400).json({errMessage : 'Product Already Exists'})


        await db.query('insert into products (id, images, title, description , category , subcategory , price) values (?,?,?,?,?,?,?)' , [req.user.userId , [JSON.stringify(base64)] , parsedRequest.name , parsedRequest.description , parsedRequest.category , parsedRequest.subCategory, parsedRequest.price])
        return res.status(200).json({message : 'product added succsefully' , productDetails : `${product.name}${product.description}${product.category}${product.subCategory}`})

    }catch(err){
        return res.status(500).json({errMessage : 'Internal Error'  , err : err})
    }

})

ProductsRouter.get('/' , async (req,res) => {
    try{

        const products = await db.query('select * from products')
        return res.status(200).json({message : 'Products Fetched Succesfully' , products : products[0]})

    }catch(err){
        return res.status(500).json({errMessage : 'Internal Errror' , err : err})
    }
})

ProductsRouter.get('/my-products' , ValidateToken , async (req,res) => {
    try{

        const [ products ] = await db.query('select users.id , products.products_id , products.images, products.title , products.description , products.category , products.subcategory, products.price, users.fullname , users.email , users.country_code, users.phone from products join users on users.id = products.id where products.id = ?' , req.user.userId)
        
        if(products.length < 1) return res.status(400).json({errMessage: 'No Products Yet' , products : []})
        
        return res.status(200).json({message : 'Products Fetched Succesfully' , data : products})

    }catch(err){
        return res.status(500).json({errMessage : 'Internal Errror' , err : err})
    }
})

ProductsRouter.get('/saved-products' , ValidateToken , async(req,res) => {

    try{
        
        const [saved_ids] = await db.query('select * from saved_products where id = ?' , [req.user.userId])
        
        if(saved_ids.length < 1) return res.status(400).json({message : 'No Saved Jobs Found' , data : []})

        const ids = saved_ids.map(id => id)
        const products = ids.map(id => db.query('select * from products where id = ? and select * from users' , id.id))
        const productsResp = await Promise.all(products)

        
        const creatorQueries = ids.map(id => db.query('select id ,fullname , email , country_code , phone from users where id = ?' , id.id))
        const creatorResp = await Promise.all(creatorQueries)

        const productsList = productsResp[0][0]
        const creatorList = creatorResp[0][0]

        console.log(productsList)
        console.log(creatorList)

        // return res.status(200).json({message : 'Saved Jobs Found' , data  : resp})

    }catch(err){
        return res.status(500).json({errMessage : 'Internal Error' , err : err})
    }


})

ProductsRouter.get('/:id' , ValidateToken , async (req,res) => {

    const id = req.params.id

    try{

        const [ products ] = await db.query('select * from products where id = ?' , id)

        if(products.length < 1) return res.status(400).json({message : 'No Product Found Created By This User' , productDetails : null})

            return res.status(200).json(200).json({message : 'Product Found Created By This User' , productDetails : products})

    }catch(err){
        return res.status(500).json({errMessage : 'Internal Errror' , err : err})
    }
})

module.exports = ProductsRouter