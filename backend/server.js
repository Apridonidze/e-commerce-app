const express = require('express')
const app = express()

require('dotenv').config()

const cors = require('cors')
const CorsOptions = require('./config/CorsOptions')


app.use(cors(CorsOptions))
app.use(express.json())
app.use(express.urlencoded({extended : true}))

const PORT = process.env.PORT || 8080

const LoginRouter = require('./routes/Login')
const SignRouter = require('./routes/Sign')
const ProductsRouter = require('./routes/Products')
const UsersRouter = require('./routes/Users')

app.use('/login', LoginRouter)
app.use('/sign', SignRouter)
app.use('/products' , ProductsRouter)
app.use('/users' , UsersRouter)

app.listen(PORT , () => {
    console.log(`listening to port ${PORT}`)
})