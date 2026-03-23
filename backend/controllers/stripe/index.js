const createCustomer = require("./stripe.customer");//service to create customer intent
const createSetup = require("./stripe.setup"); //service to create stripe card setup
const webhook = require('./stripe.webhook'); //webhook to handle stripe events
const me = require('./me'); //service to get my cardss non-sensitive information from db 

module.exports = {createCustomer, createSetup, webhook,me}; //exporting services from controllers