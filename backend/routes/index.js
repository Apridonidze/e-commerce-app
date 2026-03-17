const express = require('express')
const router = express.Router()

const authRoutes = require('./auth.route')
const usersRoutes = require('./users.route')
const adminRoutes = require('./admin.route')
const productRoutes = require('./product.route')
const cartRoutes = require('./cart.route')
const orderRoutes = require('./orders.route')
const feedbackRoutes = require('./feedback.route')
const stripeRoutes = require('./stripe.route')
const DashboardRoutes = require('./dashboard.route')
const ReportRoutes = require('./reports.route')

router.use('/auth' , authRoutes)
router.use('/users', usersRoutes)
router.use('/admin', adminRoutes)
router.use('/product', productRoutes)
router.use('/cart', cartRoutes)
router.use('/order', orderRoutes)
router.use('/dashboard', DashboardRoutes)
router.use('/feedback', feedbackRoutes)
router.use('/report' , ReportRoutes)
router.use('/stripe', stripeRoutes)


module.exports = router;