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
const CartRouter = require('./routes/Cart')
const AdminRouter = require('./routes/Admin')
const InternalProducts = require('./routes/InternalProducts')

app.use('/login', LoginRouter)
app.use('/sign', SignRouter)
app.use('/products' , ProductsRouter)
app.use('/users' , UsersRouter)
app.use('/cart' , CartRouter)
app.use('/admin', AdminRouter)
app.use('/internal-products', InternalProducts)

app.listen(PORT , () => {
    console.log(`listening to port ${PORT}`)
})