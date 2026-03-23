const express = require('express'); //importing epxress
const route = express.Router(); //initializing route

const routes = require('../controllers/dashboard'); //importing routes

const ValidateToken = require('../middlewares/ValidateToken');
const isAdmin = require('../middlewares/isAdmin');//importing middlewares

route.get('/' , ValidateToken, isAdmin , routes.list);
route.get('/:status/:offset' , ValidateToken, isAdmin , routes.orderList);
route.put('/:orderId' , ValidateToken, isAdmin, routes.update); //defining api paths

module.exports = route; //exporting routes