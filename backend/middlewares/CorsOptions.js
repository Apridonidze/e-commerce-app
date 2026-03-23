require('dotenv').config(); //importing env file

const CorsOptions = {
    credentials: true,
    origin : process.env.ORIGIN_URL,
    methods: ["GET" ,"POST", "PUT" , "DELETE"],
    allowedHeaders :  ['Content-Type' , 'Authorization'],
    transports: ["polling", "websocket"]
}; //definng cors options

module.exports = CorsOptions; //exporting middleware