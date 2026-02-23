const express = require('express')
const router = express.Router()

const route = require('../controllers/stripe')

const ValidateToken = require('../middlewares/ValidateToken')

router.get('/my-customer-id' , route.me)
router.post('/create-setup-intent' , route.createSetup)
router.post('/create-customer-intent' , ValidateToken , route.createCustomer)

module.exports = router