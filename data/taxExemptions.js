var pool = require('./dbConnection').pool;

function getById(userId, taxExemptionId) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spTaxExemptionGetById(?, ?);';

        var params = [userId, taxExemptionId];

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
        var query = 'CALL spTaxExemptionGetAll(?);';
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

function create(userId, taxExemption) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spTaxExemptionCreate(?, ?, ?);';

        var params = [
            userId,
            taxExemption.name,
            taxExemption.amount
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

function update(userId, taxExemption) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spTaxExemptionUpdate(?, ?, ?, ?);';

        var params = [
            userId,
            taxExemption.id,
            taxExemption.name,
            taxExemption.amount
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

function deleteById(userId, taxExemptionId) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spTaxExemptionDelete(?, ?);';

        var params = [userId, taxExemptionId];

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