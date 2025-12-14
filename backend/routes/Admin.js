const express = require('express')
const AdminRouter = express.Router()

const ValidateToken = require('../config/ValidateToken')

AdminRouter.get('/' , ValidateToken , async(req,res) => {
    res.send('Get API Endpoint Route for Admin')
})

AdminRouter.post('/add-new-admin' , ValidateToken , async(req,res) => {
    res.send('Post API Endpoint Route for Admin')
})

module.exports = AdminRouter