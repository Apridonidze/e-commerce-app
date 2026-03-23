const list = require("./list"); //service to fetch dashboard data
const orderList = require("./order.list"); //service to fetch full order list with offset + status
const update = require('./update'); //service to update order with orderId and status

module.exports = {list, update , orderList}; //exporting services from controller