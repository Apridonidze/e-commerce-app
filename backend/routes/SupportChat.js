const express = require('express');
const SupportChatRouter = express.Router();

const ValidateToken = require('../config/ValidateToken');
const isAdmin = require('../config/isAdmin')

const db = require('../config/db')


SupportChatRouter.get('/' , ValidateToken, async(req,res) => { //get chat messages for users 
    try {

        const userId = req.user.userId

        //add 204 status code to not return empty data as successful

        const [ messages ] = await db.query('select * from support_messages where sender_id = ? ' , [userId])
        return res.status(200).json({message : "Recieved Messages" , messages : messages})

        
    }catch(err){
        return res.status(500).json({errMessage : "Internal Error" , err : err})
    }
})


//create api endpoint for admins to see every inbox they have (every admin should have 10 inbox max (if every admins inbox is full , move message to message pendings so when there  is enough space in admins inbox (less than 10) it will be pushed to admin inbox))
//middleware can be used to check admins inbox space


SupportChatRouter.post('/send-user-message', ValidateToken, async(req,res) => {
    try{
        //create or get conversation id middleware
        //add validation for req.body
        const senderId = req.user.userId
        const content = req.body.content


        //send users first message to random admin to make it easier for admins to manage inboxes //use middleware 

        //after reciever admin id is defined reciver will temporary be this admin
        
        await db.query('insert into support_messages (id, reciever_id, content) values (?,?,?)', [senderId , 1 , content])
        return res.status(200).json({message : "Message Send Successfully" , message : content})

    }catch(err){
        return res.status(500).json({errMessage : "Internal Error" , err : err})
    }
})


SupportChatRouter.post('/send-admin-message', ValidateToken, isAdmin , async(req,res) => {
//create or get conversation id middleware
})

module.exports = SupportChatRouter;

//create route for admin to finsh conversation once admin helps user and tere is no need to keep chatting 

//create admins inbox size checker middlewware
//before user is assigned to admin for support chat , when we get request from user we should check if admin is online and if they have space in inbox (less than 10 inboxes)
//if so we run sencond middleware to generate conversation id and reciver admn
//if not we should assing message as a pending since there is no admin online or they are busy with responding other people


//create conversation id generator/checker middleware
//middleware should check if user already has responder
//if not conversation id should be generated and defined as varaiobe (exp: conversation_id)
//then variable will be used for assigning user to admin 

