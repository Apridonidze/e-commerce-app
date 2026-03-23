const express = require('express'); //importing expreess
const router = express.Router();//initializing route

const adminRoute = require('../controllers/admin'); //defining routes

const ValidateToken = require('../middlewares/ValidateToken');
const isAdmin = require('../middlewares/isAdmin');//importing middlewares


router.post('/' , ValidateToken, isAdmin , adminRoute.add);
router.get('/search-users' , ValidateToken, isAdmin , adminRoute.userList);
router.delete('/:id' , ValidateToken, isAdmin, adminRoute.remove); //definign api paths

module.exports = router; //exporting routes