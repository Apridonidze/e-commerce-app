const express = require('express')
const AdminRouter = express.Router()

const ValidateToken = require('../config/ValidateToken')
const isAdmin = require('../config/isAdmin')
const db = require('../config/db')

AdminRouter.get('/' , ValidateToken , isAdmin ,  async(req,res) => {
    try{
        
        return res.status(200).json({message : 'Access Granted', isAdmin : true})

    }catch(err){
        return res.status(500).json({errMessage : "Internal Error" , err : err})
    }
})

AdminRouter.get('/admin-list' , ValidateToken, isAdmin, async(req,res) => {
    try{

        const [ AdminList ] = await db.query('select users.id, users.fullname, users.email from admin join users on admin.id = users.id')
        if(AdminList.length < 1) return res.status(400).json({message : 'No Admins Found', adminList : []})

        return res.status(200).json({message : 'Admins Found' , adminList : AdminList})

    }catch(err){
        return res.status(500).json({errMessage : "Internal Error" , err : err})
    }
})


AdminRouter.post('/add-new-admin/:id' , ValidateToken , isAdmin , async(req,res) => {
    try{
        
        await db.query('insert into admin (id) values (?)' , newAdmId)
        return res.status(200).json({message : 'New Admin Successfully Added To List' , newAdminId : newAdmId})

    }catch(err){
        return res.status(500).json({errMessage : "Internal Error" , err : err})
    }
})


AdminRouter.delete('/add-new-admin/:id' , ValidateToken , isAdmin , async(req,res) => {
    try{
        const admId = req.params.id

        
        await db.query('delete from admin where id = ?' , admId)
        return res.status(200).json({message : 'New Admin Successfully Added To List' , admId : admId})

    }catch(err){
        return res.status(500).json({errMessage : "Internal Error" , err : err})
    }
})

module.exports = AdminRouter