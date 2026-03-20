const express = require('express')
const router = express.Router()

const ValidateToken = require('../middlewares/ValidateToken')
const isAdmin = require('../middlewares/isAdmin')

const reportsRoute = require('../controllers/reports')

router.get('/:offset', ValidateToken, isAdmin, reportsRoute.list)
router.get('/report-list/:offset/:status' , ValidateToken, isAdmin, reportsRoute.fullList)
router.put('/:id', ValidateToken, isAdmin, reportsRoute.clear)
router.post('/:id', ValidateToken, reportsRoute.add)

module.exports = router