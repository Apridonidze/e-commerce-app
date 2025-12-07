const express = require('express')
const app = express()

require('dotenv').config()

const PORT = process.env.PORT || 8080

const LoginRouter = require('./routes/Login')

app.use('/login', LoginRouter)

app.listen(PORT , () => {
    console.log(`listening to port ${PORT}`)
})