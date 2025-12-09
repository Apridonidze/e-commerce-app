const rateLimiter = require('rate-limiter')

const RateLimiter = rateLimiter({
    windowMs : 10 * 1000,
    max : 1,
    message : 'Please Wait 10 seconds before trying again'
})


module.exports = RateLimiter