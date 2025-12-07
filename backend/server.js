const express = require('express')
const app = express()

require('dotenv').config()

const PORT = process.env.PORT || 8080

const LoginRouter = require('./routes/Login')
const SignRouter = require('./routes/Sign')

app.use('/login', LoginRouter)
app.use('/sign', SignRouter)

app.listen(PORT , () => {
    console.log(`listening to port ${PORT}`)
})