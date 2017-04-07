var pool = require('./dbConnection').pool;

function getById(transactionId) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spTransactionGetById(?);';

        var params = [transactionId];

        pool.query(query, params, (err, results) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(results[0].length > 0 ? results[0][0] : null);
        });
    });
}

function getAll(year, month) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spTransactionGetAll();';

        pool.query(query, (err, results) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(results[0]);
        });
    });
}

function getMonth(year, month) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spTransactionGetMonth(?);';
        var fullDate;

        if (year && month) {
            fullDate = year + '/' + month + '/' + 1;
        }

        var params = [fullDate];

        pool.query(query, params, (err, results) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(results[0]);
        });
    });
}

function create(transaction) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spTransactionCreate(?, ?, ?, ?);';

        var params = [
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

function update(transaction) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spTransactionUpdate(?, ?, ?, ?, ?);';

        var params = [
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

function deleteById(transactionId) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spTransactionDelete(?);';

        var params = [transactionId];

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
    create: create,
    update: update,
    deleteById: deleteById
};