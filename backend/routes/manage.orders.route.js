const express = require('express')
const router = express.Router()

const manageOrdersRoute = require('../controllers/manage.order')

const ValidateToken = require('../middlewares/ValidateToken')
const isAdmin = require('../middlewares/isAdmin')

router.get('/order', ValidateToken, isAdmin, manageOrdersRoute.list)
router.post('/order', ValidateToken, manageOrdersRoute.add)
router.get('/order-count', ValidateToken, isAdmin, manageOrdersRoute.count)
router.get('/pending-order', ValidateToken, isAdmin, manageOrdersRoute.pending)
router.get('/onway-order', ValidateToken, isAdmin, manageOrdersRoute.onway)
router.get('/delivered-order', ValidateToken, isAdmin, manageOrdersRoute.delivered)
router.delete('/order', ValidateToken, manageOrdersRoute.remove)
router.delete('/remove-admin-order', ValidateToken, isAdmin, manageOrdersRoute.removeAdmin)
router.put('/order', ValidateToken, isAdmin, manageOrdersRoute.update)

module.exports = router