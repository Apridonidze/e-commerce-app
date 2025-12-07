const express = require('express')
const LoginRouter = express.Router()

const db = require('../config/db')

const LoginSchema = require('../schemas/LoginSchema')

LoginRouter.post('/', async (req,res) => {

    const validateLogin = LoginSchema(req.body.data)

    if(!validateLogin.success) return res.status(400).json({err : 'Invalid Inputs'})

    try{
        const userData = req.body.data

        const [isEmailValid] = await db.query('select * from users where email = ?' , [userData.email]);

        if(isEmailValid.length < 1) return res.status(400).json({err : 'Email Or Password Incorrect'})
        
        const [ isPasswordValid ] = await db.query('select * from users where email = ? and password = ?' , [userData.email , userData.password])

        if(isPasswordValid.length < 1) return res.status(400).json({err : "Email Or Password Incorrect"})

        return res.status(200).json({resp : 'User Found'})

    }catch(err){
        return res.status(500).json(err)
    }
})



module.exports = LoginRouter