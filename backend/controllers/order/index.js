const add = require("./add"); //service to create order
const check = require("./check"); //service to check order status with orderId
const list = require("./list"); //service to fetct all orders 
const remove = require("./remove"); //service to delete our own order with orderId
const adminRemove = require('./admin.remove'); //service which allwos admin to delte users order with mail sending to customer

module.exports = {add, list, remove, adminRemove , check}; //exporting services from controlller