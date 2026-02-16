const express = require('express')
const app = express()

require('dotenv').config()

const cors = require('cors')
const CorsOptions = require('./middlewares/CorsOptions')

app.use(cors(CorsOptions))
app.use(express.json())
app.use(express.urlencoded({extended : true}))

const http = require('http')
const server = http.createServer(app)

const PORT = process.env.PORT || 8080

const SupportChatSocket = require('./socket/SupportChatSocket')
SupportChatSocket(server)

const routes = require('./routes')

app.use('/api', routes)

server.listen(PORT , () => {
    console.log(`Listening To Port: ${PORT}`)
})