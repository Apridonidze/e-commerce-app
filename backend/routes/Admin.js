const express = require('express')
const AdminRouter = express.Router()

const ValidateToken = require('../config/ValidateToken')
const db = require('../config/db')

AdminRouter.get('/' , ValidateToken , async(req,res) => {
    try{

        const id = req.user.userId

        // const [ doesUserExists ]

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

        const [ isAdmin ] = await db.query('select id from admin where id = ?' , id)
        if(isAdmin.length < 1) return res.status(400).json({message : "Access Declined"})
        
        await db.query('insert into admin (id) values (?)' , newAdmId)
        return res.status(200).json({message : 'New Admin Successfully Added To List' , newAdminId : newAdmId})

    }catch(err){
        return res.status(500).json({errMessage : "Internal Error" , err : err})
    }
})

module.exports = AdminRouter