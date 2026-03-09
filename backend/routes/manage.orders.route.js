const express = require('express')
const router = express.Router()

const manageOrdersRoute = require('../controllers/manage.order')

const ValidateToken = require('../middlewares/ValidateToken')
const isAdmin = require('../middlewares/isAdmin')

router.get('/', ValidateToken, isAdmin, manageOrdersRoute.list)
router.get('/pending-order', ValidateToken, isAdmin, manageOrdersRoute.pending)
router.get('/onway-order', ValidateToken, isAdmin, manageOrdersRoute.onway)
router.get('/delivered-order', ValidateToken, isAdmin, manageOrdersRoute.delivered)
router.delete('/', ValidateToken, manageOrdersRoute.remove)
router.put('/', ValidateToken, isAdmin, manageOrdersRoute.update)

module.exports = router