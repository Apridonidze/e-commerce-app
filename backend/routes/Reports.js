const express = require('express')
const ReportsRouter = express.Router()

const db = require('../config/db')
const ValidateToken = require('../config/ValidateToken')
const isAdmin = require('../config/isAdmin')

ReportsRouter.get('/product-reports', ValidateToken, isAdmin, async(req,res) => {
    try{



    }catch(err){
        return res.status(500).json({errMessage : "Internal Erorr" , err : err})
    }
})

ReportsRouter.get('/report-product/product_id=:id', ValidateToken, async(req,res) => {
    try{

        

    }catch(err){
        return res.status(500).json({errMessage : "Internal Erorr" , err : err})
    }
})

module.exports = ReportsRouter