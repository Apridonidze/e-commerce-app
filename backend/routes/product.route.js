const express = require('express'); //importing express
const router = express.Router(); //initializing expreess router

const productRoute = require('../controllers/product');//importing routes

const uploader = require('../utils/uploader')
const ValidateToken = require('../middlewares/ValidateToken');
const isAdmin = require('../middlewares/isAdmin');//importing middlewares and image uploader utility

router.get('/', productRoute.list);
router.get('/sales-products' , productRoute.salesList);
router.get('/similar-products', productRoute.similarList);
router.get('/product-details', productRoute.productDetails);
router.post('/' , ValidateToken, isAdmin , uploader.array("images", 5) , productRoute.add);
router.post('/search-product', productRoute.ProductSearch);
router.put('/:id' , ValidateToken, isAdmin, uploader.array("images", 5) , productRoute.edit);
router.delete('/:id' , ValidateToken, isAdmin , productRoute.remove);//defining api routes

module.exports = router;//exporting route