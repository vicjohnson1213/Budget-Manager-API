var pool = require('./dbConnection').pool;

function getById(userId, taxDeductionId) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spTaxDeductionGetById(?, ?);';

        var params = [userId, taxDeductionId];

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
        var query = 'CALL spTaxDeductionGetAll(?);';
        var params = [userId]

        pool.query(query, params, (err, results) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(results[0]);
        });
    });
}

function create(userId, taxDeduction) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spTaxDeductionCreate(?, ?, ?);';

        var params = [
            userId,
            taxDeduction.name,
            taxDeduction.amount
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

function update(userId, taxDeduction) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spTaxDeductionUpdate(?, ?, ?, ?);';

        var params = [
            userId,
            taxDeduction.id,
            taxDeduction.name,
            taxDeduction.amount
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

function deleteById(userId, taxDeductionId) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spTaxDeductionDelete(?, ?);';

        var params = [userId, taxDeductionId];

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