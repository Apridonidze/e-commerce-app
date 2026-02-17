const add = require('./add')
const count = require('./count.order')
const list = require('./list')
const pending = require('./pending.order')
const onway = require('./onway.order')
const delivered = require('./delivered.order')
const update = require('./update')
const remove = require('./remove')
const removeAdmin = require('./remove.admin')

module.exports = {add, count, list,pending, onway, delivered, update,remove,removeAdmin}