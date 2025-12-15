const express = require('express')
const AdminRouter = express.Router()

const ValidateToken = require('../config/ValidateToken')
const db = require('../config/db')

AdminRouter.get('/' , ValidateToken , async(req,res) => {
    try{

        const id = req.user.userId

        const [ doesUserExists ] = await db.query('select id from users where id = ?' , id)
        if(doesUserExists.length < 1) return res.status(400).json({message : "User Not Found"})

        const [ isAdmin ] = await db.query('select id from admin where id = ?' , id)
        if(isAdmin.length < 1) return res.status(400).json({message : "Access Declined"})
        
        return res.status(200).json({message : 'Access Granted', isAdmin : true})

    }catch(err){
        return res.status(500).json({errMessage : "Internal Error" , err : err})
    }
})

AdminRouter.post('/add-new-admin/:id' , ValidateToken , async(req,res) => {
    try{
        const id = req.user.userId
        const newAdmId = req.params.id

        
        const [ doesUserExists ] = await db.query('select id from users where id = ?' , id)
        if(doesUserExists.length < 1) return res.status(400).json({message : "User Not Found"})

        
        const [ doesNewAdminExists ] = await db.query('select id from users where id = ?' , newAdmId)
        if(doesNewAdminExists.length < 1) return res.status(400).json({message : "User Not Found"})

        const [ isAdmin ] = await db.query('select id from admin where id = ?' , id)
        if(isAdmin.length < 1) return res.status(400).json({message : "Access Declined"})
        
        await db.query('insert into admin (id) values (?)' , newAdmId)
        return res.status(200).json({message : 'New Admin Successfully Added To List' , newAdminId : newAdmId})

    }catch(err){
        return res.status(500).json({errMessage : "Internal Error" , err : err})
    }
})


AdminRouter.delete('/add-new-admin/:id' , ValidateToken , async(req,res) => {
    try{
        const id = req.user.userId
        const admId = req.params.id

        
        const [ doesUserExists ] = await db.query('select id from users where id = ?' , id)
        if(doesUserExists.length < 1) return res.status(400).json({message : "User Not Found"})

        
        const [ doesNewAdminExists ] = await db.query('select id from users where id = ?' , admId)
        if(doesNewAdminExists.length < 1) return res.status(400).json({message : "User Not Found"})

        const [ isAdmin ] = await db.query('select id from admin where id = ?' , id)
        if(isAdmin.length < 1) return res.status(400).json({message : "Access Declined"})
        
        await db.query('delete from admin where id = ?' , admId)
        return res.status(200).json({message : 'New Admin Successfully Added To List' , admId : admId})

    }catch(err){
        return res.status(500).json({errMessage : "Internal Error" , err : err})
    }
})

module.exports = AdminRouter