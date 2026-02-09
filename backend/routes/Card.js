const express = require('express');
const ValidateToken = require('../config/ValidateToken');
const CardRouter = express.Router();

CardRouter.get('/', ValidateToken , (req,res) => {

})


CardRouter.post('/add-card' , ValidateToken , async (req,res) => {

})

CardRouter.put('/edit-card' , ValidateToken , async (req,res) => {

})

CardRouter.delete('/remove-card' , ValidateToken , async (req, res) => {

})

module.exports = CardRouter