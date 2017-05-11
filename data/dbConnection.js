var mysql = require('mysql'),

    config = require('../config/config');

module.exports.pool = mysql.createPool({
    connectionLimit : 100,
    host: config.db.host,
    user: config.db.username,
    password: config.db.password,
    database: 'BudgetManager',
    debug: false
});