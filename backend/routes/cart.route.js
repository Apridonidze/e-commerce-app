const express = require('express');
const router = express.Router();

const cartRoute = require('../controllers/cart')

const ValidateToken = require('../middlewares/ValidateToken');
const RateLimiter = require('../middlewares/RateLimiter');

router.get('/cart' , ValidateToken , cartRoute.list)
router.post('/cart/:id' , ValidateToken , RateLimiter, cartRoute.list)
router.delete('/cart/:id' , ValidateToken , RateLimiter, cartRoute.list)


module.exports = router