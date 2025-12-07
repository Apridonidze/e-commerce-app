const express = require('express')
const LoginRouter = express.Router()


LoginRouter.post('/', (req,res) => {
    console.log(req)
})



module.exports = LoginRouter