const express = require('express')
const UsersRouter = express.Router()

const ValidateToken = require('../config/ValidateToken')

const db = require('../config/db')

UsersRouter.get('/', ValidateToken , async(req,res) => {
    try{

        const id = req.user.userId

        const [ user ] = await db.query('select fullname, email,country_code, phone  from users where id = ?' , id)
        
        if(user.length < 1) return res.status(400).json({errMessage : "User Not Found" , user : null})

        return res.status(200).json({message : 'User Found' , user : user[0]})


    }catch(err){
        return res.status(500).json({errMessage : 'Internal Error'  , err : err})
    }
})


UsersRouter.get('/:id' , async(req , res) => {

    try{

        const id = req.params.id

        const [ user ] = await db.query('select fullname , email , country_code , phone from users where id = ?' , id)

        if(user.length < 1) return res.status(400).json({errMessage : 'User Not Found' , user : null})

        return res.status(200).json({message : 'User Found' , user: user[0]})

    }catch(err){
        return res.status(500).json({errMessage : 'Internal Error' , err : err})
    }
    
})


module.exports = UsersRouter