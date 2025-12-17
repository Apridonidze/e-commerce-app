const express = require('express')
const ReportsRouter = express.Router()

const db = require('../config/db')
const ValidateToken = require('../config/ValidateToken')
const isAdmin = require('../config/isAdmin')

ReportsRouter.get('/product-reports', ValidateToken, isAdmin, async(req,res) => {
    try{
        
        const [ ReportsList ] = await db.query('select users.fullname , users.id , users.email from reports join users on users.id = reports.id')
        if(ReportsList.length < 1) return res.status(400).json({message : "No Reports Yet." , reports : ReportsList})

        return res.status(200).json({message : "Reports Found" , reports : ReportsList})
        
    }catch(err){
        return res.status(500).json({errMessage : "Internal Erorr" , err : err})
    }
})


module.exports = ReportsRouter