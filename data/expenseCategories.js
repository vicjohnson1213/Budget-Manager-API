var pool = require('./dbConnection').pool;

function getById(expenseCategoryId) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spExpenseCategoryGetById(?);';

        var params = [expenseCategoryId];

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
        var query = 'CALL spExpenseCategoryGetAll();';

        pool.query(query, (err, results) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(results[0]);
        });
    });
}

function create(expenseCategory) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spExpenseCategoryCreate(?, ?);';

        var params = [
            expenseCategory.parentId,
            expenseCategory.name,
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

function update(expenseCategory) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spExpenseCategoryUpdate(?, ?, ?);';

        var params = [
            expenseCategory.id,
            expenseCategory.parentId,
            expenseCategory.name
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

function deleteById(expenseCategoryId) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spExpenseCategoryDelete(?);';

        var params = [expenseCategoryId];

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