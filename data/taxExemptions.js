var pool = require('./dbConnection').pool;

function getById(taxExemptionId) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spTaxExemptionGetById(?);';

        var params = [taxExemptionId];

        pool.query(query, params, (err, results) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(results[0].length > 0 ? results[0][0] : null);
        });
    });
}

function getAll() {
    return new Promise((resolve, reject) => {
        var query = 'CALL spTaxExemptionGetAll();';

        pool.query(query, (err, results) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(results[0]);
        });
    });
}

function create(taxExemption) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spTaxExemptionCreate(?, ?);';

        var params = [
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

function update(taxExemption) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spTaxExemptionUpdate(?, ?, ?);';

        var params = [
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

function deleteById(taxExemptionId) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spTaxExemptionDelete(?);';

        var params = [taxExemptionId];

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