require('dotenv').config()

const CorsOptions = {
    credentials: true,
    origin : process.env.ORIGIN_URL,
    methods: ["GET" ,"POST", "PUT" , "DELETE"],
    allowedHeaders :  ['Content-Type' , 'Authorization']
}

module.exports = CorsOptions