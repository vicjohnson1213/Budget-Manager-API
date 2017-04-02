var pool = require('./dbConnection').pool;

function getById(taxDeductionId) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spTaxDeductionGetById(?);';

        var params = [taxDeductionId];

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
        var query = 'CALL spTaxDeductionGetAll();';

        pool.query(query, (err, results) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(results[0]);
        });
    });
}

function create(taxDeduction) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spTaxDeductionCreate(?, ?);';

        var params = [
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

function update(taxDeduction) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spTaxDeductionUpdate(?, ?, ?);';

        var params = [
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

function deleteById(taxDeductionId) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spTaxDeductionDelete(?);';

        var params = [taxDeductionId];

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