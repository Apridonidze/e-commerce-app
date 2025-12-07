const express = require('express')
const SignRouter = express.Router()

SignRouter.post('/' , (req,res) => {
    console.log(req.body.data)

    try{
        
    }catch(err){
        return res.status(500).json({errMessage : 'Internal Error'  , err : err})
    }
})


module.exports = SignRouter