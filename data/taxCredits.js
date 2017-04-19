var pool = require('./dbConnection').pool;

function getById(userId, taxCreditId) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spTaxCreditGetById(?, ?);';

        var params = [userId, taxCreditId];

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
        var query = 'CALL spTaxCreditGetAll(?);';
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

function create(userId, taxCredit) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spTaxCreditCreate(?, ?, ?);';

        var params = [
            userId,
            taxCredit.name,
            taxCredit.amount
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

function update(userId, taxCredit) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spTaxCreditUpdate(?, ?, ?, ?);';

        var params = [
            userId,
            taxCredit.id,
            taxCredit.name,
            taxCredit.amount
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

function deleteById(userId, taxCreditId) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spTaxCreditDelete(?, ?);';

        var params = [userId, taxCreditId];

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
    create: create,
    update: update,
    deleteById: deleteById
};