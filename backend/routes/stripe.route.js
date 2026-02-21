const express = require('express')
const router = express.Router()

const route = require('../controllers/stripe')

router.post('/create-setup-intent' , route.createSetup)
router.post('/create-customer-intent' , route.createCustomer)

module.exports = router