var pool = require('./dbConnection').pool;

function getById(budgetId) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spBudgetGetById(?);';

        var params = [budgetId];

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
        var query = 'CALL spBudgetGetAll();';

        pool.query(query, (err, results) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(results[0]);
        });
    });
}

function create(budget) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spBudgetCreate(?, ?);';

        var params = [
            budget.categoryId,
            budget.amount
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

function update(budget) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spBudgetUpdate(?, ?, ?);';

        var params = [
            budget.id,
            budget.categoryId,
            budget.amount
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

function deleteById(budgetId) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spBudgetDelete(?);';

        var params = [budgetId];

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