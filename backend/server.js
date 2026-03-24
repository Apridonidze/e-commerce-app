require('dotenv').config(); //importing envv file

const express = require('express'); //importing express
const app = express(); //defining express

const cors = require('cors'); //importing cors library to prevent foreign sources to access server
const CorsOptions = require('./middlewares/CorsOptions'); //importing cors option object to asign to cors library

const webhook = require('./controllers/stripe'); //importing stripe webhook file
app.post('/api/stripe/webhook', express.raw({ type: 'application/json' }) , webhook.webhook); //creating route for webhook in server.js to pass raw json files instead of decoded ones

app.use(cors(CorsOptions));//using cors with corsoptions
app.use(express.json()); // parsing incoming json requests
app.use(express.urlencoded({extended : true})); // parses url-econded data

const http = require('http');//importing http
const server = http.createServer(app); //creating server with http for webscoket
const PORT = process.env.PORT || 8081; //importing port from env file or defining 8081 as default if env file fails

const routes = require('./routes');//importing routes folder
const SupportChatSocket = require('./socket/SupportChatSocket'); //importing websocket file

app.use('/api', routes);//defining api route for apis
SupportChatSocket(server); //passing server data to websocket

server.listen(PORT , () => {
    console.log(`Listening To Port:  ${PORT}`)
}); //listening to server
