const express = require('express')
const router = express.Router()

const authRoutes = require('./auth.route')
const usersRoutes = require('./users.route')
const adminRoutes = require('./admin.route')
const productRoutes = require('./product.route')
const cartRoutes = require('./cart.router')
const orderRoutes = require('./orders.route')
const feedbackRoutes = require('./feedback.route')

router.use('/auth' , authRoutes)
router.use('/users', usersRoutes)
router.use('/admin', adminRoutes)
router.use('/product', productRoutes)
router.use('/cart', cartRoutes)
router.use('/order', orderRoutes)
router.use('/feedback', feedbackRoutes)


module.exports = router