const express = require('express')
const SignRouter = express.Router()

SignRouter.post('/' , (req,res) => {
    console.log(req.body)
})


module.exports = SignRouter