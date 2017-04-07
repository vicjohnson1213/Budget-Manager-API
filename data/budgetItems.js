var pool = require('./dbConnection').pool;

function fixBooleans(items) {
    items.forEach((item) => {
        item.isMonthlyPayment = item.isMonthlyPayment === 1;
    });

    return items;
}

function getById(budgetItemId) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spBudgetItemGetById(?);';

        var params = [budgetItemId];

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
        var query = 'CALL spBudgetItemGetAll();';

        pool.query(query, (err, results) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(fixBooleans(results[0]));
        });
    });
}

function create(budget) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spBudgetItemCreate(?, ?, ?, ?);';

        var params = [
            budget.budgetCategoryId,
            budget.name,
            budget.amount,
            budget.isMonthlyPayment
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

function update(budget) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spBudgetItemUpdate(?, ?, ?, ?, ?);';

        var params = [
            budget.id,
            budget.budgetCategoryId,
            budget.name,
            budget.amount,
            budget.isMonthlyPayment
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

function deleteById(budgetItemId) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spBudgetItemDelete(?);';

        var params = [budgetItemId];

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