const express = require('express')
const app = express()

require('dotenv').config()

const cors = require('cors')
const CorsOptions = require('./config/CorsOptions')

app.use(cors(CorsOptions))
app.use(express.json())
app.use(express.urlencoded({extended : true}))

const http = require('http')
const server = http.createServer(app)

const PORT = process.env.PORT || 8080


const SupportChatSocket = require('./socket/SupportChatSocket')
SupportChatSocket(server)

const LoginRouter = require('./routes/Login')
const SignRouter = require('./routes/Sign')
const ProductsRouter = require('./routes/Products')
const UsersRouter = require('./routes/Users')
const CartRouter = require('./routes/Cart')
const AdminRouter = require('./routes/Admin')
const ProductsManagment = require('./routes/ProductsManagment')
const ReportsRouter = require('./routes/Reports')
const FeedbackRouter = require('./routes/Feedback')


app.use('/login', LoginRouter)
app.use('/sign', SignRouter)
app.use('/products' , ProductsRouter)
app.use('/users' , UsersRouter)
app.use('/cart' , CartRouter)
app.use('/admin', AdminRouter)
app.use('/manage-products', ProductsManagment)
app.use('/reports', ReportsRouter)
app.use('/feedback', FeedbackRouter)

server.listen(PORT , () => {
    console.log(`listening to port ${PORT}`)
})