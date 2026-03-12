const express = require('express')
const route = express.Router()

const routes = require('../controllers/dashboard')

const ValidateToken = require('../middlewares/ValidateToken')
const isAdmin = require('../middlewares/isAdmin')

route.get('/' , ValidateToken, isAdmin , routes.list)
route.get('/:status/:offset' , ValidateToken, isAdmin , routes.list)
route.put('/:orderId' , ValidateToken, isAdmin, routes.update);

module.exports = route