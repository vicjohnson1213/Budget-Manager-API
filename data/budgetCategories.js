var pool = require('./dbConnection').pool;

function getById(budgetCategoryId) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spBudgetCategoryGetById(?);';

        var params = [budgetCategoryId];

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
        var query = 'CALL spBudgetCategoryGetAll();';

        pool.query(query, (err, results) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(results[0]);
        });
    });
}

function create(budgetCategory) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spBudgetCategoryCreate(?);';

        var params = [
            budgetCategory.name,
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

function update(budgetCategory) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spBudgetCategoryUpdate(?, ?);';

        var params = [
            budgetCategory.id,
            budgetCategory.name
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

function deleteById(budgetCategoryId) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spBudgetCategoryDelete(?);';

        var params = [budgetCategoryId];

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