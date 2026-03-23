const add = require('./add');//adding platform feedback
const addProdFb = require('./add.product.fb'); //adding product feedback
const list = require('./list'); //fetching feedbacks
const customerList = require('./customer.list'); //fetcing feedbacks for landing page 
const getByProdId = require('./get.product.fb'); //fetcing product feedbacks with productId params
const remove = require('./remove'); //deleting feeback from db

module.exports = {add, addProdFb, getByProdId, list, customerList, remove}; //exproting services from controller