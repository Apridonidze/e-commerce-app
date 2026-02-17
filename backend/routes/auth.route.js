const express = require('express')
const router = express.Router();

const authRoute = require('../controllers/auth');
const ValidateToken = require('../middlewares/ValidateToken');

router.post('/sign', authRoute.sign)
router.post('/login' , authRoute.login)
router.get('/me' , ValidateToken , authRoute.me)
router.delete('/logout' , ValidateToken, authRoute.logout)

module.exports = router