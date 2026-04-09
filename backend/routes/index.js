const express = require('express'); //importing epxreess
const router = express.Router(); //initializing router

const authRoutes = require('./auth.route');
const adminRoutes = require('./admin.route');
const productRoutes = require('./product.route');
const cartRoutes = require('./cart.route');
const orderRoutes = require('./orders.route');
const addressRoutes = require('./address.route');
const feedbackRoutes = require('./feedback.route');
const stripeRoutes = require('./stripe.route');
const DashboardRoutes = require('./dashboard.route');
const ReportRoutes = require('./reports.route'); //imoprting routes

router.use('/auth' , authRoutes);
router.use('/admin', adminRoutes);
router.use('/product', productRoutes);
router.use('/cart', cartRoutes);
router.use('/order', orderRoutes);
router.use('/address' , addressRoutes);
router.use('/dashboard', DashboardRoutes);
router.use('/feedback', feedbackRoutes);
router.use('/report' , ReportRoutes);
router.use('/stripe', stripeRoutes); //defining api routes

module.exports = router;//exporting route