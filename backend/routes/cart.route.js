const express = require('express');
const router = express.Router();

const cartRoute = require('../controllers/cart')

const ValidateToken = require('../middlewares/ValidateToken');
const RateLimiter = require('../middlewares/RateLimiter');

router.get('/my-cart' , ValidateToken , cartRoute.list)
router.post('/add-to-cart/:id' , ValidateToken , RateLimiter, cartRoute.list)
router.delete('/remove-from-cart/:id' , ValidateToken , RateLimiter, cartRoute.list)


module.exports = router