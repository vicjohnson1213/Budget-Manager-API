var mysql = require('mysql');

module.exports.pool = mysql.createPool({
    connectionLimit : 100,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'BudgetManager',
    debug: false
});