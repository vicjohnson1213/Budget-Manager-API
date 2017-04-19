var pool = require('./dbConnection').pool;

function getById(userId, transactionId) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spTransactionGetById(?, ?);';

        var params = [userId, transactionId];

        pool.query(query, params, (err, results) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(results[0].length > 0 ? results[0][0] : null);
        });
    });
}

function getAll(userId) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spTransactionGetAll(?);';
        var params = [userId];

        pool.query(query, params, (err, results) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(results[0]);
        });
    });
}

function getMonth(userId, year, month) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spTransactionGetMonth(?, ?);';
        var fullDate;

        if (year && month) {
            fullDate = year + '/' + month + '/' + 1;
        }

        var params = [userId, fullDate];

        pool.query(query, params, (err, results) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(results[0]);
        });
    });
}

function getMonthSummary(userId, year, month) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spTransactionGetMonthSummary(?, ?);';
        var fullDate;

        if (year && month) {
            fullDate = year + '/' + month + '/' + 1;
        }

        var params = [userId, fullDate];

        pool.query(query, params, (err, results) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(results[0]);
        });
    });
}

function create(userId, transaction) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spTransactionCreate(?, ?, ?, ?, ?);';
        
        var params = [
            userId,
            transaction.date,
            transaction.name,
            transaction.budgetItemId,
            transaction.amount
        ];

        pool.query(query, params, (err, results) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(results[0]);
        });
    });
}

function update(userId, transaction) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spTransactionUpdate(?, ?, ?, ?, ?, ?);';

        var params = [
            userId,
            transaction.id,
            transaction.date,
            transaction.name,
            transaction.budgetItemId,
            transaction.amount
        ];

        pool.query(query, params, (err, results) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(results[0]);
        });
    });
}

function deleteById(userId, transactionId) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spTransactionDelete(?, ?);';

        var params = [userId, transactionId];

        pool.query(query, params, (err, results) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(results[0]);
        });
    });
}

module.exports = {
    getById: getById,
    getAll: getAll,
    getMonth: getMonth,
    getMonthSummary: getMonthSummary,
    create: create,
    update: update,
    deleteById: deleteById
};