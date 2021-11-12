var mysql = require('mysql2');
var mysql = require('mysql2/promise');
var db = '';

try {
    db = mysql.createPool({
        host : '140.238.12.42',
        user : 'opensource',
        password : 'opensourceteam2',
        database : 'school'
    })
} catch (err) {
    console.log(err);
}

module.exports = {
    db
}