const express = require('express')
const router = express.Router()

const feedbackRoutes = require('../controllers/feedback')
const ValidateToken = require('../middlewares/ValidateToken')
const isAdmin = require('../middlewares/isAdmin')

router.get('/product-feedback/:id', feedbackRoutes.getByProdId)
router.get('/customer-feedbacks' , feedbackRoutes.customerList)
router.post('/product-feedback/:id', ValidateToken, feedbackRoutes.addProdFb)
router.post('/', ValidateToken, feedbackRoutes.add)
router.delete('/:feedbackId' , ValidateToken, isAdmin , feedbackRoutes.remove)
router.get('/:offset/:status', feedbackRoutes.list)

module.exports = router