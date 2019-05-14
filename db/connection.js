const mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
    database: 'delivery_service',
    host: "localhost",
    user: "root",
    password: "root"
});

module.exports = connection;