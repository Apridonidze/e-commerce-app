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


ReportsRouter.post('/report-product/product_id=:id', ValidateToken, async(req,res) => {
    try{
        const productId = req.params.id
        const data = req.body.data

        // add zod schema for data

        await db.query('insert into report (id, product_id ,type, content) values (?,?,?,?)' , [req.user.userId , productId, data.type , data.content])
        return res.status(200).json({message : "Report Sent Successfully"})


    }catch(err){
        return res.status(500).json({errMessage : "Internal Erorr" , err : err})
    }
})

ReportsRouter.post('/report-platform' , ValidateToken , async(req,res) => {
    try{

        const data = req.body.data

        //validate data in zod schema

        const report = await db.query('insert into reports (id, type, content, product_id) values (?,?,?,?)' , [req.user.userId , data.type , data.content, data.productId ?? null])
        return res.status(200).json({message : "Report Send Successfully" ,reportId : report.insertId })


    }catch(err){
        return res.status(500).json({errMessage : "Internal Error" , err : err})
    }
})

module.exports = ReportsRouter