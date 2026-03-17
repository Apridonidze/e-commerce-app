const express = require('express')
const router = express.Router();

const orderRoutes = require('../controllers/order');
const ValidateToken = require('../middlewares/ValidateToken');
const isAdmin = require('../middlewares/isAdmin');

router.get('/' , ValidateToken , orderRoutes.list)
router.get('/:id', ValidateToken, isAdmin, orderRoutes.check);
router.post('/' , ValidateToken , orderRoutes.add)
router.delete('/:id' , ValidateToken , orderRoutes.remove)
router.delete('/admin-remove/:id' , ValidateToken , isAdmin, orderRoutes.adminRemove)

module.exports = router