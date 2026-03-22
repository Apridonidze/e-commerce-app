const sign = require('./sign');//service to sign new account
const login = require('./login'); //service to login into exsisting account
const logout = require('./logout'); //service to log out from account
const me = require('./me'); //service to fetch your user's data

module.exports = {sign, login, logout, me}; //exporting services via controller