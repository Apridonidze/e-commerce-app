const express = require('express');
const SupportChatRouter = express.Router();

const ValidateToken = require('../config/ValidateToken');
const isAdmin = require('../config/isAdmin')

const db = require('../config/db')

SupportChatRouter.get('/' , ValidateToken, async(req,res) => {
    try {

        const userId = req.user.userId

        const [ messages ] = await db.query('select * from support_messages where id = ? or reciever_id = ?' , [userId, userId])
        return res.status(200).json({message : "Recieved Messages Succesfully" , messages : messages})

       
    }catch(err){
        return res.status(500).json({errMessage : "Internal Error" , err : err})
    }
})

//add api endpoint for admins to get all messages  


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