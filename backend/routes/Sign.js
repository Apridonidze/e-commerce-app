const express = require('express')
const SignRouter = express.Router()

const SignSchema = require('../schemas/SignSchema')

const db = require('../config/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require('dotenv').config()

SignRouter.post('/' , async (req,res) => {
    
    const inputValidateResp = SignSchema(req.body.data)

    if(!inputValidateResp.success) return res.status(400).json('Invalid Input')
        
    try{

        const userinputs = req.body.data

        const [isFullnameInserted] = await db.query('select * from users where fullname = ? ' , [userinputs.name]);
        const [emailInserted] = await db.query('select * from users where email = ? ' , [userinputs.email])
        const [phoneNumberInserted] = await db.query('select * from users where country_code = ? and phone = ?' , [userinputs.phoneNumber.split(' ')[0],userinputs.phoneNumber.split(' ')[1]])
        const hasshedPassword = await bcrypt.hash(userinputs.password , 10)

        let errorList = {}

        if(isFullnameInserted.length > 0) errorList = {...errorList , state : 'name', nameError : 'User With This Name Already Exists'}
        if(emailInserted.length > 0) errorList = {...errorList , state : 'email', nameError : 'This Email Is Already In Use'}
        if(phoneNumberInserted.length > 0) errorList = {...errorList , state : 'phone' , nameError : 'This Phone Number Is Already Used'}

        if(errorList.length > 0) return res.status(400).json(errorList)
            
        const [createUser] = await db.query('INSERT INTO users (fullname, email, country_code, phone, password) VALUES (?, ?, ?, ?, ?)',[userinputs.name ,userinputs.email, userinputs.phoneNumber.split(' ')[0],userinputs.phoneNumber.split(' ')[1], hasshedPassword]);
        
        const payload = {userId : createUser.insertId, userEmail : userinputs.email }
        const token = jwt.sign(payload , process.env.JWT_SECRET_KEY , {expiresIn : "30d"})

        return res.status(200).json({message : 'User Created Successfully' , token : token})

        
    }catch(err){
        if(err.code === 'ER_DUP_ENTRY'){
            if(err.message.includes('users.fullname'))return res.status(400).json({errMessage : 'This Name Is Already In Use' , state : 'name' , err : err})
            if(err.message.includes('users.email'))return res.status(400).json({errMessage : 'This Email Is Already In Use' , state : 'email' , err : err})
        }

        return res.status(500).json({errMessage : 'Internal Error'  , err : err})
    }
})


module.exports = SignRouter