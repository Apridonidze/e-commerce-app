const rateLimiter = require('express-rate-limit')

const RateLimiter = rateLimiter({
    windowMs : 10 * 1000,
    max : 1,
    message : 'Please Wait 10 seconds before trying again'
})


module.exports = RateLimiter