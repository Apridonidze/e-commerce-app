const express = require('express'); //importing express
const router = express.Router(); //initializing express route

const feedbackRoutes = require('../controllers/feedback');//importing routes

const ValidateToken = require('../middlewares/ValidateToken');
const isAdmin = require('../middlewares/isAdmin'); //importing routes

router.get('/product-feedback/:id', feedbackRoutes.getByProdId);
router.get('/customer-feedbacks' , feedbackRoutes.customerList);
router.post('/product-feedback/:id', ValidateToken, feedbackRoutes.addProdFb);
router.post('/', ValidateToken, feedbackRoutes.add);
router.delete('/:feedbackId' , ValidateToken, isAdmin , feedbackRoutes.remove);
router.get('/:offset/:status', feedbackRoutes.list);//defining api paths

module.exports = router;  //exporting route