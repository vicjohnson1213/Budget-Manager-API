var pool = require('./dbConnection').pool;

function getById(userId, budgetCategoryId) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spBudgetCategoryGetById(?, ?);';

        var params = [userId, budgetCategoryId];

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
        var query = 'CALL spBudgetCategoryGetAll(?);';
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

function create(userId, budgetCategory) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spBudgetCategoryCreate(?, ?);';

        var params = [
            userId,
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

function update(userId, budgetCategory) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spBudgetCategoryUpdate(?, ?, ?);';

        var params = [
            userId,
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

function deleteById(userId, budgetCategoryId) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spBudgetCategoryDelete(?, ?);';

        var params = [userId, budgetCategoryId];

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