const express = require('express')
const router = express.Router()

const route = require('../controllers/stripe')

const ValidateToken = require('../middlewares/ValidateToken')

router.get('/my-customer-id' , ValidateToken,  route.me)
router.post('/create-setup-intent' , ValidateToken ,route.createSetup)
router.post('/create-customer-intent' , ValidateToken , route.createCustomer)
router.post('/webhook', express.raw({ type: 'application/json' }) ,route.webhook)

module.exports = router