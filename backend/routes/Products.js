const express = require('express')
const ProductsRouter = express.Router()

const fs = require('fs')
const multer = require('multer')
const upload = multer({dest : 'uploads/'})

const ValidateToken = require('../config/ValidateToken')
const NewProductSchema = require('../schemas/NewProductSchema')

const db = require('../config/db')

const RateLimiter = require('../config/RateLimiter')
const isAdmin = require('../config/isAdmin')
const SearchSchema = require('../schemas/SearchSchema')

ProductsRouter.post('/' , ValidateToken, isAdmin , RateLimiter ,upload.fields([{name :'images', maxCount : 20}]), async (req,res) => {

    const product = req.body

    
    const parsedRequest = {
        name : product.name.toString(),
        description : product.description.toString(),
        price : Number(product.price),
        category : product.category.toString(),
        subCategory : product.subCategory.toString(),
        amount :  Number(product.amount),
        date : product.date
    }; //displaying bodys data

    const validateProduct = NewProductSchema(parsedRequest);


    if(!validateProduct.success) return res.status(400).json({errMessage : 'Invalid Input'})

    try{
        
        const files = req.files?.images;
        const filesBuffer = await Promise.all(files.map(file => fs.promises.readFile(file.path)));
        const base64 = filesBuffer.map(buffer => buffer.toString("base64"))

        const [isAlreadyAdded] = await db.query('select * from products where id = ? and title = ?' , [req.user.userId , product.name])

        if(isAlreadyAdded.length > 0) return res.status(400).json({errMessage : 'Product Already Exists'})

        await db.query('insert into products (id, images, title, description , category , subcategory , price, amount , date) values (?,?,?,?,?,?,?,?,?)' , [req.user.userId , [JSON.stringify(base64)] , parsedRequest.name , parsedRequest.description , parsedRequest.category , parsedRequest.subCategory, parsedRequest.price, parsedRequest.amount , parsedRequest.date])
        return res.status(200).json({message : 'product added succsefully' , productDetails : `${product.name}${product.description}${product.category}${product.subCategory}`})

    }catch(err){
        return res.status(500).json({errMessage : 'Internal Error'  , err : err})
    }

})


// add delete for products(admin)
//add update for procuts (admin)

ProductsRouter.get('/' , async (req,res) => {
    try{

        const limit = 15
        const offset = parseInt(req.query.offset) || 0;
        const category = req.query.category;
 
        if(category){
            const [ filteredProducts ] = await db.query('select products.products_id, products.images, products.title, products.description, products.category, products.subcategory, products.price, products.amount from products where subcategory = ? order by products.date limit ? , ?' , [category,offset , offset + limit])

            if(filteredProducts.length < 1) return res.status(200).json({message : "No Products In That Category" , products : []}) //change 200 status code with 204
            
            return res.status(200).json({message : "Products Found With This Category" , products : filteredProducts})

        }

        const [ products ] = await db.query('select products.products_id, products.images, products.title, products.description, products.category, products.subcategory, products.price, products.amount from products order by products.date limit ? , ?' , [offset , offset + limit])
        return res.status(200).json({message : 'Products Fetched Succesfully' , products : products})

    }catch(err){
        return res.status(500).json({errMessage : 'Internal Errror' , err : err})
    }
})

ProductsRouter.get('/similar-products' , async(req,res) => {
    
    const {category, subcategory, id} = req.query

    try{

        //check category and subcategoryt in zod

        const [products] = await db.query('select products_id, images , title	, description ,price , amount, category, subcategory from products where category like ? and subcategory like ? and products_id != ?' , [category, subcategory, id])

        if(products.length < 1) return res.status(204)

        return res.status(200).json({message : "Products Found" , products: products})

    }catch(err){
        console.log(err)
        return res.status(500).json({errMessage : 'Internal Error', err : err})
    }
    
})

ProductsRouter.get('/product-details', async (req,res) => {

    const { id } = req.query;
  
    try{

        const [ products ] = await db.query('select * from products where products_id = ?' , id)

        if(products.length === 0) return res.status(404).json({message : 'Product Not Found' , product : products[0]})
        
        return res.status(200).json({message : "Product Found" , product : products[0]})
    }catch(err){
        return res.status(500).json({errMessage : 'Internal Errror' , err : err})
    }
})

ProductsRouter.get('/item-data-list' , async (req,res) => {
    try{

        const ValidateSearch = SearchSchema(req.query)

        if(!ValidateSearch.success) return res.status(400).json({message : "Invalid Input" , products : []})
        
        const searchInput = req.query.searchItem;

        const [ datalist ] = await db.query('select products.products_id, products.images, products.title, products.description, products.category, products.subcategory, products.price, products.amount, products.date from products where LOWER(products.title) like LOWER(?)', [`${searchInput}%`])
        if(datalist.length < 1) return res.status(204)
        
        return res.status(200).json({message : "Items Found" , products : datalist})

    }catch(err){
        return res.status(500).json({errMessage : "Internal Error" , err : err})
    }
})

ProductsRouter.get('/admin-products' ,ValidateToken , isAdmin, async (req,res) => {
    try{
        
        const limit = 15
        const offset = parseInt(req.query.adminProductsOffset);

        const [ products ] = await db.query('select products.* , users.fullname , users.id from products join users on products.id = users.id ORDER BY products.date desc limit 15')
        if(products.length  < 1) return res.status(400).json({message : 'No Products Yet' , products : products})


        return res.status(200).json({message : 'Products Fetched Succesfully' , products : products})

    }catch(err){
        return res.status(500).json({errMessage : 'Internal Errror' , err : err})
    }
})

ProductsRouter.get('/saved-products' , ValidateToken , async(req,res) => {
    
    try{
        
        const [ saved_products ] = await db.query('select * from saved_products join products on saved_products.product_id = products.products_id where saved_products.id = ?' , [req.user.userId])
        
        if(saved_products.length < 1) return res.status(204).json({message : 'No Saved Products Found' , products : []})

        return res.status(200).json({message : 'Saved Products Found' , products  : saved_products})

    }catch(err){
        return res.status(500).json({errMessage : 'Internal Error' , err : err})
    }

})

ProductsRouter.post('/saved-products/:id' , ValidateToken , RateLimiter, async (req, res) => {
    const ProductId = req.params.id

    try{
        
        if(!Number(ProductId)) return res.status(400).json({message : "Invalid Product Id"})

        const [ DoesProductExists ] = await db.query('select * from products where products_id = ?', ProductId)
        if(DoesProductExists.length < 1) return res.status(400).json({message : 'Product Does Not Exists In Database'})

        
        const [ isProductAlreadySaved ] = await db.query('select * from saved_products where id = ? and product_id = ?', [req.user.userId , ProductId])
        if(isProductAlreadySaved.length > 0) return res.status(400).json({message : 'Product is Already Saved'})
        
        await db.query('insert into saved_products (id, product_id) values (?,?)' , [req.user.userId , ProductId])
        return res.status(200).json({message : 'Product Saved Successfully'})

    }catch(err){
        return res.status(500).json({errMessage : "Internal Error" , err : err})
    }

})


ProductsRouter.delete('/saved-products/:id' , ValidateToken ,RateLimiter,  async (req, res) => {
    const ProductId = req.params.id

    try{
        
        if(!Number(ProductId)) return res.status(400).json({message : "Invalid Product Id"})

        const [ DoesProductExists ] = await db.query('select * from products where products_id = ?', ProductId)
        if(DoesProductExists.length < 1) return res.status(400).json({message : 'This Product Does Not Exists In Database'})

        const [ isProductSaved ]  = await db.query('select * from saved_products where product_id = ? and id = ?' , [ProductId , req.user.userId])
        if(isProductSaved.length < 1) return res.status(400).json({message : 'This Product Is Not Saved'})
        

        await db.query('delete from saved_products where id = ? and product_id = ?' , [req.user.userId , ProductId])
        return res.status(200).json({message : 'Product Unsaved Successfully'})

    }catch(err){
        return res.status(500).json({errMessage : "Internal Error" , err : err})
    }

})


module.exports = ProductsRouter