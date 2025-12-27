const express = require('express');
const SupportChatRouter = express.Router();

const ValidateToken = require('../config/ValidateToken');
const isAdmin = require('../config/isAdmin')

const db = require('../config/db')

SupportChatRouter.get('/' , ValidateToken, async(req,res) => {

})


SupportChatRouter.post('/send-user-message', ValidateToken, async(req,res) => {
    try{

        //add validation for req.body
        const senderId = req.user.userId
        const content = req.body.content
        
        await db.query('insert into support_messages (id, reciever_id, content) values (?,?,?)', [senderId , 1 , content])
        return res.status(200).json({message : "Message Send Successfully" , message : content})

    }catch(err){
        return res.status(500).json({errMessage : "Internal Error" , err : err})
    }
})


SupportChatRouter.post('/send-admin-message', ValidateToken, isAdmin , async(req,res) => {

})

module.exports = SupportChatRouter;