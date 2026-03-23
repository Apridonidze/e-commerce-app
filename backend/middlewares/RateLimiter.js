const rateLimiter = require('express-rate-limit'); //importing rateLimiter

const RateLimiter = rateLimiter({
    windowMs : 10 * 1000,
    max : 1,
    message : 'Please Wait 10 seconds before trying again'
});//setting rate limiter parameters and message

module.exports = RateLimiter; //exporting middleware