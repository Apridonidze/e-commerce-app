const express = require('express')
const router = express.Router();

const productRoute = require('../controllers/product');
const ValidateToken = require('../middlewares/ValidateToken');
const isAdmin = require('../middlewares/isAdmin');

router.post('/' , ValidateToken, isAdmin , productRoute.add)
router.put('/:id' , ValidateToken, isAdmin , productRoute.edit)
router.delete('/:id' , ValidateToken, isAdmin , productRoute.remove)
router.get('/', productRoute.list)
router.get('/similar-products', productRoute.similarList)
router.get('/product-details', productRoute.productDetails)
router.post('/search-product', productRoute.ProductSearch)


module.exports = router