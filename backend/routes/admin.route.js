const express = require('express')
const router = express.Router();

const adminRoute = require('../controllers/admin');

const rateLimiter = require('../middlewares/RateLimiter')
const ValidateToken = require('../middlewares/ValidateToken');
const isAdmin = require('../middlewares/isAdmin')


router.get('/admin' , ValidateToken, isAdmin , adminRoute.list)
router.post('/admin' , ValidateToken, isAdmin ,rateLimiter, adminRoute.add)
router.delete('/admin' , ValidateToken, isAdmin ,rateLimiter, adminRoute.remove)

module.exports = router