const express = require('express'); //importing express
const router = express.Router(); //defining express route

const orderRoutes = require('../controllers/order'); //importing routes

const ValidateToken = require('../middlewares/ValidateToken');
const isAdmin = require('../middlewares/isAdmin'); //importing middlewares

router.get('/' , ValidateToken , orderRoutes.list);
router.get('/:id', ValidateToken, isAdmin, orderRoutes.check);
router.post('/' , ValidateToken , orderRoutes.add);
router.delete('/:id' , ValidateToken , orderRoutes.remove);
router.delete('/admin-remove/:id' , ValidateToken , isAdmin, orderRoutes.adminRemove); //defining api paths

module.exports = router; //exporting routes