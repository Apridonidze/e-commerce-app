const express = require('express')
const router = express.Router()

const ValidateToken = require('../middlewares/ValidateToken')
const isAdmin = require('../middlewares/isAdmin')

const reportsRoute = require('../controllers/reports')

router.get('/', ValidateToken, isAdmin, reportsRoute.list)
router.delete('/:id', ValidateToken, isAdmin, reportsRoute.clear)
router.post('/report-platform', ValidateToken, reportsRoute.addPlatformReport)
router.post('/report-product/:id', ValidateToken, reportsRoute.addProductReport)

module.exports = router