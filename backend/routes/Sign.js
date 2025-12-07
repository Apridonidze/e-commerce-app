const express = require('express')
const SignRouter = express.Router()

const SignSchema = require('../schemas/SignSchema')

SignRouter.post('/' , (req,res) => {
    
    const inputValidateResp = SignSchema(req.body.data)

    if(!inputValidateResp.success) return res.status(400).json('Invalid Input')
        
    try{


        
    }catch(err){
        return res.status(500).json({errMessage : 'Internal Error'  , err : err})
    }
})


module.exports = SignRouter