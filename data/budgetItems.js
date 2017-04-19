var pool = require('./dbConnection').pool;

function fixBooleans(items) {
    items.forEach((item) => {
        item.isMonthlyPayment = item.isMonthlyPayment === 1;
    });

    return items;
}

function getById(userId, budgetItemId) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spBudgetItemGetById(?, ?);';

        var params = [userId, budgetItemId];

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
        var query = 'CALL spBudgetItemGetAll(?);';
        var params = [userId];

        pool.query(query, params, (err, results) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(fixBooleans(results[0]));
        });
    });
}

function create(userId, budget) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spBudgetItemCreate(?, ?, ?, ?);';

        var params = [
            userId,
            budget.budgetCategoryId,
            budget.name,
            budget.amount
        ];

        pool.query(query, params, (err, results) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(fixBooleans(results[0]));
        });
    });
}

function update(userId, budget) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spBudgetItemUpdate(?, ?, ?, ?, ?);';

        var params = [
            userId,
            budget.id,
            budget.budgetCategoryId,
            budget.name,
            budget.amount
        ];

        pool.query(query, params, (err, results) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(fixBooleans(results[0]));
        });
    });
}

function deleteById(userId, budgetItemId) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spBudgetItemDelete(?, ?);';

        var params = [userId, budgetItemId];

        pool.query(query, params, (err, results) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(fixBooleans(results[0]));
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