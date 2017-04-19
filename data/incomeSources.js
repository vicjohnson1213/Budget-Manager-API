var pool = require('./dbConnection').pool;

function getById(userId, incomeSourceId) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spIncomeSourceGetById(?, ?);';

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

function getAll(userId) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spIncomeSourceGetAll(?);';
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

function create(userId, incomeSource) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spIncomeSourceCreate(?, ?, ?);';

        var params = [
            userId,
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

function update(userId, incomeSource) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spIncomeSourceUpdate(?, ?, ?, ?);';

        var params = [
            userId,
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

function deleteById(userId, incomeSourceId) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spIncomeSourceDelete(?, ?);';

        var params = [userId, incomeSourceId];

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