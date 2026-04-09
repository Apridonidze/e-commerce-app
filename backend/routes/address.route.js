const express = require('express'); //importing express
const route = express.Router(); //initializing route

const ValidateToken = require('../middlewares/ValidateToken'); ///importing middleware
const routes = require('../controllers/address'); //importing controllers

route.post('/', ValidateToken , routes.add);
route.delete('/', ValidateToken, routes.remove); //defining routes

module.exports = route; //exporting route