const express = require('express'); //importign express 
const router = express.Router(); // initializing route

const cartRoute = require('../controllers/cart');//importing routes

const ValidateToken = require('../middlewares/ValidateToken'); //importing middlewares

router.get('/' , ValidateToken , cartRoute.list);
router.post('/:id' , ValidateToken , cartRoute.add);
router.delete('/:id' , ValidateToken , cartRoute.remove); //defining api routes

module.exports = router; //exporting route