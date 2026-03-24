require('dotenv').config();//importing env file

const mysql = require('mysql2/promise');//importing mysql library

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
}); //creating sql connection

module.exports = db; //exporting utility