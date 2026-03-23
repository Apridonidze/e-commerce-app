const express = require('express');//importing epxress 
const router = express.Router(); //initializing router

const authRoute = require('../controllers/auth');//importing routes

const ValidateToken = require('../middlewares/ValidateToken');//importing middleware

router.get('/me' , ValidateToken , authRoute.me);
router.post('/sign', authRoute.sign);
router.post('/login' , authRoute.login); //defining api routes

module.exports = router;//exporting routes