const express = require('express'); //importing express
const router = express.Router(); // initializing express router

const route = require('../controllers/stripe'); //importing routes

const ValidateToken = require('../middlewares/ValidateToken');//importing middleware

router.get('/my-customer-id' , ValidateToken,  route.me);
router.post('/create-setup-intent' , ValidateToken ,route.createSetup);
router.post('/create-customer-intent' , ValidateToken , route.createCustomer); //definign routes

module.exports = router; //exporting routes