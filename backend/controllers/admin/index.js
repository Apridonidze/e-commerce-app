const add = require('./add'); //service to add new admins to admin table
const remove = require('./remove'); //service to remove admin from admin table
const userList = require('./user.list'); //service to search users for promotion to admin

module.exports = {add, remove , userList }; //exporting services 