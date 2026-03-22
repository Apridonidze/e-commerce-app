const express = require('express')
const router = express.Router();

const productRoute = require('../controllers/product');
const ValidateToken = require('../middlewares/ValidateToken');
const isAdmin = require('../middlewares/isAdmin');

const uploader = require('../utils/uploader')

router.get('/', productRoute.list)
router.get('/sales-products' , productRoute.salesList);
router.get('/similar-products', productRoute.similarList)
router.get('/product-details', productRoute.productDetails)
router.post('/' , ValidateToken, isAdmin , uploader.array("images", 5) , productRoute.add)
router.post('/search-product', productRoute.ProductSearch)
router.put('/:id' , ValidateToken, isAdmin, uploader.array("images", 5) , productRoute.edit)
router.delete('/:id' , ValidateToken, isAdmin , productRoute.remove)


module.exports = router