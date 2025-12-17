const express = require('express')
const FeedbackRouter = express.Router()

const ValidateToken = require('../config/ValidateToken')
const isAdmin = require('../config/isAdmin')
const db = require('../config/db')

FeedbackRouter.get('/' , ValidateToken, isAdmin , async(req,res) => {
    try{

        const [ feedbacks ] = await db.query('select feedback.* users.fullname, users.id from feedback join users on users.id = feedback.id')
        if(feedbacks.length < 1) return res.status(400).json({message : "No Feedbacks Yet." , feedbacks : feedbacks})

        return res.status(200).json({message : "Feedbacks Found" , feedbacks})

    }catch(err){
        return res.status(500).json({errMessage : "Internal Error" , err : err})
    }
})

FeedbackRouter.post('/new-feedback' , ValidateToken, async(req,res) => {
    try{
        const data = req.body.data

        // validate data in zod schema

        const [ newFeedback ] = await db.query('insert into feedback (id, content, starts) values (?,?,?)' , [req.user.userId , data.content, data.stars])
        return res.status(200).json({message : "Feedback Sent Succesfully" , feedbackId : newFeedback.insertId})

    }catch(err){
        return res.status(500).json({errMessage : "Internal Error" , err : err})
    }
})

module.exports = FeedbackRouter