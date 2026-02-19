const express = require('express');
const router = express.Router();

const cartRoute = require('../controllers/cart')

const ValidateToken = require('../middlewares/ValidateToken');
const RateLimiter = require('../middlewares/RateLimiter');

router.get('/' , ValidateToken , cartRoute.list)
router.post('/:id' , ValidateToken , RateLimiter, cartRoute.add)
router.delete('/:id' , ValidateToken , RateLimiter, cartRoute.remove)


module.exports = router