const express = require('express')
const FeedbackRouter = express.Router()

const ValidateToken = require('../config/ValidateToken')
const db = require('../config/db')

FeedbackRouter.get('/platform-feedback' , async(req,res) => {
    try{

        const [ feedbacks ] = await db.query('select feedback.*, users.fullname from feedback join users on users.id = feedback.id where feedback.type = ?', ['platform'])
        if(feedbacks.length < 1) return res.status(204).json({message : "No Feedbacks Yet." , feedback  : feedbacks})

        return res.status(200).json({message : "Feedbacks Found" , feedback  : feedbacks})

    }catch(err){
        return res.status(500).json({errMessage : "Internal Error" , err : err})
    }
})

FeedbackRouter.post('/platform-feedback' , ValidateToken, async(req,res) => {
    try{
        const data = req.body.data

        // validate data in zod schema

        const [ newFeedback ] = await db.query('insert into feedback (id, content, stars, type) values (?,?,?,?)' , [req.user.userId , data.content, data.stars, data.type])
        return res.status(200).json({message : "Feedback Sent Succesfully" , feedbackId : newFeedback.insertId})

    }catch(err){
        return res.status(500).json({errMessage : "Internal Error" , err : err})
    }
})

FeedbackRouter.get('/product-feedback/:id' , async(req,res) => {
    try{

        const prodId = req.params.id

        const [ feedbacks ] = await db.query('select feedback.*, users.fullname from feedback join users on users.id = feedback.id where feedback.type = ? and feedback.product_id = ?', ['product', prodId])
        if(feedbacks.length < 1) return res.status(204).json({message : "No Feedbacks Yet." , feedback  : feedbacks})

        return res.status(200).json({message : "Feedbacks Found" , feedback  : feedbacks})

    }catch(err){
        return res.status(500).json({errMessage : "Internal Error" , err : err})
    }
})

FeedbackRouter.post('/product-feedback/:id' , ValidateToken, async(req,res) => {
    try{
        const data = req.body.data
        const prodId = req.params.id
        // validate data in zod schema

        const [ newFeedback ] = await db.query('insert into feedback (id, content, stars, product_id) values (?,?,?,?)' , [req.user.userId , data.content, data.stars, prodId])
        return res.status(200).json({message : "Feedback Sent Succesfully" , feedbackId : newFeedback.insertId})

    }catch(err){
        return res.status(500).json({errMessage : "Internal Error" , err : err})
    }
})

module.exports = FeedbackRouter