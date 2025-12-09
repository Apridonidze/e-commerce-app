const express = require('express')
const UsersRouter = express.Router()

const ValidateToken = require('../config/ValidateToken')

UsersRouter.get('/', ValidateToken ,(req,res) => {
    try{


        

    }catch(err){
        return res.status(500).json({errMessage : 'Internal Error'  , err : err})
    }
})


module.exports = UsersRouter