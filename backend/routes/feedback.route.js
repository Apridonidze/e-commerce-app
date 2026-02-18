const express = require('express')
const router = express.Router()

const feedbackRoutes = require('../controllers/feedback')
const ValidateToken = require('../middlewares/ValidateToken')

router.get('/', feedbackRoutes.list)
router.get('/product-feedback/:id', feedbackRoutes.getProdFb)
router.post('/', ValidateToken, feedbackRoutes.add)
router.post('/product-feedback/:id', ValidateToken, feedbackRoutes.addProdFb)

module.exports = router