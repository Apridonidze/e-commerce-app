const express = require('express')
const LoginRouter = express.Router()

const db = require('../config/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const LoginSchema = require('../schemas/LoginSchema')


LoginRouter.post('/', async (req,res) => {

    const validateLogin = LoginSchema(req.body.data)

    if(!validateLogin.success) return res.status(400).json({err : 'Invalid Inputs'})

    try{
        const userData = req.body.data

        const [rows] = await db.query('select * from users where email = ?' , [userData.email]);

        if(rows.length < 1) return res.status(404).json({err : 'Invalid Email Or Password'})
        
        const user = rows[0]
        
        const isPasswordValid = await bcrypt.compare(userData.password , user.password)
       
        if(!isPasswordValid) return res.status(400).json({err : 'Invalid Email Or Password'})
        
        
        const payload = {userId : user.id , userEmail : userData.email}
        const token = jwt.sign(payload , process.env.JWT_SECRET_KEY , {expiresIn : '30d'})
        
        return res.status(200).json({message : 'Loginned' , token : token})

    }catch(err){
        return res.status(500).json({messageErr : "Internal Error" , err : err})
    }
})



module.exports = LoginRouter