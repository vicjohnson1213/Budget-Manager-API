var pool = require('./dbConnection').pool;

function getById(incomeSourceId) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spIncomeSourceGetById(?);';

        var params = [incomeSourceId];

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
        var query = 'CALL spIncomeSourceGetAll();';

        pool.query(query, (err, results) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(results[0]);
        });
    });
}

function create(incomeSource) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spIncomeSourceCreate(?, ?);';

        var params = [
            incomeSource.name,
            incomeSource.annualAmount
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

function update(incomeSource) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spIncomeSourceUpdate(?, ?, ?);';

        var params = [
            incomeSource.id,
            incomeSource.name,
            incomeSource.annualAmount
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

function deleteById(incomeSourceId) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spIncomeSourceDelete(?);';

        var params = [incomeSourceId];

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