const express = require('express')
const ReportsRouter = express.Router()

const db = require('../config/db')
const ValidateToken = require('../config/ValidateToken')
const isAdmin = require('../config/isAdmin')

ReportsRouter.get('/product-reports', ValidateToken, isAdmin, async(req,res) => {
    
})


module.exports = ReportsRouter