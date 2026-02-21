const express = require('express')
const router = express.Router()

const route = require('../controllers/stripe')

const ValidateToken = require('../middlewares/ValidateToken')

router.post('/create-setup-intent' , route.createSetup)
router.post('/create-customer-intent' , ValidateToken , route.createCustomer)

module.exports = router