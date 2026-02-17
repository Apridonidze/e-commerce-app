const express = require('express')
const router = express.Router();

const productRoute = require('../controllers/product');
const ValidateToken = require('../middlewares/ValidateToken');
const isAdmin = require('../middlewares/isAdmin');

router.use('/create-product' , ValidateToken, isAdmin , productRoute.add)
router.use('/edit-product/:id' , ValidateToken, isAdmin , productRoute.edit)
router.use('/remove-product/:id' , ValidateToken, isAdmin , productRoute.remove)
router.use('/products', productRoute.list)
router.use('/similar-products', productRoute.similarList)
router.use('/product-details', productRoute.productDetails)
router.use('/search-product', productRoute.ProductSearch)


module.exports = router