const express = require('express');
const router = express.Router();

const cartRoute = require('../controllers/cart')

const ValidateToken = require('../middlewares/ValidateToken');
router.get('/' , ValidateToken , cartRoute.list)
router.post('/:id' , ValidateToken , cartRoute.add)
router.delete('/:id' , ValidateToken , cartRoute.remove)


module.exports = router