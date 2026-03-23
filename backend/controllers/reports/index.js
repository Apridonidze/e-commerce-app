const add = require('./add'); //service to sent report
const list = require('./list'); //service to fetch report list (for admins)
const clear = require('./clear');//service to remove report from report list (for admins)
const fullList = require('./full.list');//service to fetch full report list (for admins)

module.exports = {add, list , fullList, clear};//exporting services from controller