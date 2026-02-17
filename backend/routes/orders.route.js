const express = require('express')
const router = express.Router();

const orderRoutes = require('../controllers/order');
const ValidateToken = require('../middlewares/ValidateToken');

router.get('/' , ValidateToken , orderRoutes.list)
router.post('/' , ValidateToken , orderRoutes.add)
router.delete('/' , ValidateToken , orderRoutes.remove)


module.exports = router