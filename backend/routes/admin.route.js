const express = require('express')
const router = express.Router();

const adminRoute = require('../controllers/admin');

const rateLimiter = require('../middlewares/RateLimiter')
const ValidateToken = require('../middlewares/ValidateToken');
const isAdmin = require('../middlewares/isAdmin')


router.use('/admin-list' , ValidateToken, isAdmin , adminRoute.list)
router.use('/add-new-admin' , ValidateToken, isAdmin ,rateLimiter, adminRoute.add)
router.use('/remove-admin' , ValidateToken, isAdmin ,rateLimiter, adminRoute.remove)

module.exports = router