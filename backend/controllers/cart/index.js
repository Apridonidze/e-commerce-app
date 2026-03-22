const add = require('./add'); //service to add item in your cart
const remove = require('./remove'); //service to remove item from cart 
const list = require('./list'); //service to fetch cart items for user dashboard

module.exports = {add, remove, list}; //exporting services via controller