const express = require('express')
const router = express.Router();

const adminRoute = require('../controllers/admin');

const ValidateToken = require('../middlewares/ValidateToken');
const isAdmin = require('../middlewares/isAdmin')


router.get('/admin-list' , ValidateToken, isAdmin , adminRoute.list)
router.get('/search-users' , ValidateToken, isAdmin , adminRoute.userList)
router.post('/' , ValidateToken, isAdmin , adminRoute.add)
router.delete('/:id' , ValidateToken, isAdmin, adminRoute.remove)

module.exports = router