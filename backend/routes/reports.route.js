const express = require('express'); //importin express
const router = express.Router(); //initializing epxress routes

const reportsRoute = require('../controllers/reports'); //importing routes

const ValidateToken = require('../middlewares/ValidateToken');
const isAdmin = require('../middlewares/isAdmin'); //importing middlewares 


router.get('/:offset', ValidateToken, isAdmin, reportsRoute.list);
router.get('/report-list/:offset/:status' , ValidateToken, isAdmin, reportsRoute.fullList);
router.put('/:id', ValidateToken, isAdmin, reportsRoute.clear);
router.post('/', ValidateToken, reportsRoute.add); //defining api path

module.exports = router;//exporting orutes