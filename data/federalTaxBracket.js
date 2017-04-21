var pool = require('./dbConnection').pool;

function get(income) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spFederalTaxBracketGetByIncome(?);';
        var params = [income];

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
    get: get
};