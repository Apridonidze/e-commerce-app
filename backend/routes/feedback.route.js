const express = require('express')
const router = express.Router()

const feedbackRoutes = require('../controllers/feedback')
const ValidateToken = require('../middlewares/ValidateToken')
const isAdmin = require('../middlewares/isAdmin')

router.get('/:offset/:status', feedbackRoutes.list)
router.get('/product-feedback/:id', feedbackRoutes.getProdFb)
router.post('/', ValidateToken, feedbackRoutes.add)
router.post('/product-feedback/:id', ValidateToken, feedbackRoutes.addProdFb)
router.delete('/:feedbackId' , ValidateToken, isAdmin , feedbackRoutes.remove)

module.exports = router