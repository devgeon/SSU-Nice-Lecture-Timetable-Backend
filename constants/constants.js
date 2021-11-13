var mysql = require('mysql2');
var mysql = require('mysql2/promise');
require('dotenv').config();
var db = '';

try {
    db = mysql.createPool({
        host : process.env.DB_HOST,
        user : process.env.DB_USER,
        password : process.env.DB_PASS,
        database : 'school'
    })
} catch (err) {
    console.log(err);
}

module.exports = {
    db
}