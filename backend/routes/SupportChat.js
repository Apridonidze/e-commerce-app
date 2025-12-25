const express = require('express');
const SupportChatRouter = express.Router();

const ValidateToken = require('../config/ValidateToken');
const isAdmin = require('../config/isAdmin')
//add get to retrieve messages from both sides and send notifications 
//add post to send messages
//add post to send messages as admin

SupportChatRouter.get('/' , ValidateToken, async(req,res) => {

})


SupportChatRouter.post('/send-user-message', ValidateToken, async(req,res) => {
    
})


SupportChatRouter.post('/send-admin-message', ValidateToken, isAdmin , async(req,res) => {

})

module.exports = SupportChatRouter;