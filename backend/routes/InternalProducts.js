const express = require('express')
const InternalProducts = express.Router()

const db = require('../config/db')
const isAdmin = require('../config/isAdmin')
const ValidateToken = require('../config/ValidateToken')

module.exports = InternalProducts