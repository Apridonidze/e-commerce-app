const add = require('./add'); //service to create new product as admin
const remove = require('./remove'); //service to remove product as admin
const list = require('./list'); //service to get all products with category/subcategory and offset
const salesList = require('./sales.list');//service to get all products on sale with category/subcategory and offset
const similarList = require('./similar.list'); //service to get all products similar to providen products category/subcategory
const productDetails = require('./product.details'); //service to get products details for product page
const ProductSearch = require('./product.search'); //service to get data list from searchbar
const edit = require('./edit'); //service to get edit products as an admin

module.exports = {add , remove, list, salesList, similarList, edit, productDetails, ProductSearch}; //exporting services