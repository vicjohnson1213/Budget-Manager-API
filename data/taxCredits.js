var pool = require('./dbConnection').pool;

function getById(taxCreditId) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spTaxCreditGetById(?);';

        var params = [taxCreditId];

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
        var query = 'CALL spTaxCreditGetAll();';

        pool.query(query, (err, results) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(results[0]);
        });
    });
}

function create(taxCredit) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spTaxCreditCreate(?, ?);';

        var params = [
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

function update(taxCredit) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spTaxCreditUpdate(?, ?, ?);';

        var params = [
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

function deleteById(taxCreditId) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spTaxCreditDelete(?);';

        var params = [taxCreditId];

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