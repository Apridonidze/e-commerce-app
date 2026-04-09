const express = require('express')
const route = express.Router()

const ValidateToken = require('../middlewares/ValidateToken')
const routes = require('../controllers/address')

route.post('/', ValidateToken , routes.add)

module.exports = route