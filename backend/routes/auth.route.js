const express = require('express')
const router = express.Router();

const authRoute = require('../controllers/auth');
const ValidateToken = require('../middlewares/ValidateToken');

router.use('/sign', authRoute.sign)
router.use('/login' , authRoute.login)
router.use('/me' , ValidateToken , authRoute.me)
router.use('/logout' , ValidateToken, authRoute.logout)

module.exports = router