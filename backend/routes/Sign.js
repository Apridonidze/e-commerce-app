const express = require('express')
const SignRouter = express.Router()

const SignSchema = require('../schemas/SignSchema')

const db = require('../config/db')

SignRouter.post('/' , async (req,res) => {
    
    const inputValidateResp = SignSchema(req.body.data)

    if(!inputValidateResp.success) return res.status(400).json('Invalid Input')
        
    try{

        const userinputs = req.body.data
    
        await db.query('INSERT INTO users (fullname, email, country_code, phone, password) VALUES (?, ?, ?, ?, ?)',[userinputs.name ,userinputs.email, userinputs.phoneNumber.split(' ')[0],userinputs.phoneNumber.split(' ')[1],userinputs.password]);
        return res.status(200).json('inserted')
        
    }catch(err){
        return res.status(500).json({errMessage : 'Internal Error'  , err : err})
    }
})


module.exports = SignRouter