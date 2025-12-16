const express = require('express')
const InternalProducts = express.Router()

const db = require('../config/db')
const isAdmin = require('../config/isAdmin')
const ValidateToken = require('../config/ValidateToken')

InternalProducts.get('/pending-items' ,ValidateToken, isAdmin , async(req,res) => {
    try{
    
        const [ PendingProducts ] = await db.query('select products.* , cart.* , users.id , users.fullname , users.email from cart join products on cart.product_id = products.products_id join users on products.id = users.id where cart.status = ?' , 'pending')
        if(PendingProducts.length < 1) return res.status(400).json({message : "No Products Beign Ordered" , products : []})

        return res.status(200).json({message : "Ordered Products" , products : PendingProducts})


    }catch(err){
        return res.status(500).json({errMessage : 'Internal Error' , err : err})
    }
})

InternalProducts.get('/on-way-items' ,ValidateToken, isAdmin , async(req,res) => {
    try{
        
        const [ OnWayProducts ] = await db.query('select products.* , cart.* , users.id , users.fullname , users.email from cart join products on cart.product_id = products.products_id join users on products.id = users.id where cart.status = ?' , 'on way')
        if(OnWayProducts.length < 1) return res.status(400).json({message : "No Products Beign Ordered" , products : []})

        return res.status(200).json({message : "Products On Way" , products: OnWayProducts})

    }catch(err){
        return res.status(500).json({errMessage : "Internal Error" , err : err})
    }
})

InternalProducts.get('/delivered-items', ValidateToken, isAdmin, async(req,res) => {
    try{

        const [ DeliveredProducts ] = await db.query('select products.* , cart.* , users.id , users.fullname , users.email from cart join products on cart.product_id = products.products_id join users on products.id = users.id where cart.status = ?' , 'on way')
        if(DeliveredProducts.length < 1) return res.status(400).json({message : "No Products Has Been Delivered Yet" , products : []})

        return res.status(200).json({message : "Delivered Products" , products: PendingProducts})


    }catch(err){
        return res.status(500).json({errMessage : "Internal Error" , err : err})
    }
})

InternalProducts.patch('/update-product-status/product_id=:id/user_id=:userId/status=:status' , ValidateToken , isAdmin , async(req,res) => {
    try{

        const prodId = req.params.id
        const clientId = req.params.userId
        const status = req.params.status

        const [ DoesProductExists ] = await db.query('select products.* , users.id , users.fullname , cart.* join users on products.id =  users.id join users on cart.id = users.id where products.product_id = ? and user.id = ?' , [prodId, clientId])
        if(DoesProductExists.length < 1) return res.status(400).json({message : 'No Products Found With This ID Under This Users Name' , products : []})
        
        await db.query("update table cart set status = ? where id = ? and product_id = ?" , [status, clientId , prodId])
        return res.status(200).json({message : 'Users Product Updated Successfully' , data : {status : status , clientId : clientId , productId : prodId}})

    }catch(err){
        return res.status(500).json({errMessage : "Internal Error While Updating Products Status" , err : err})
    }
})

module.exports = InternalProducts