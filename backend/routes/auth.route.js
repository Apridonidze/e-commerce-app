const express = require('express')
const router = express.Router();

const authRoute = require('../controllers/auth')

router.use('/sign', authRoute)


module.exports = router