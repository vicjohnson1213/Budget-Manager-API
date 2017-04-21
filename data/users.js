var crypto = require('crypto'),
    uuid = require('uuid'),
    pool = require('./dbConnection').pool;

function create(user) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spUserCreate(?, ?, ?);';
        var salt = uuid.v4();
        var hash = crypto.createHash('sha256').update(salt + user.password).digest('base64');

        var params = [
            user.emailAddress,
            salt,
            hash
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

function get(emailAddress) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spUserGetByEmail(?);';

        var params = [
            emailAddress
        ];

        pool.query(query, params, (err, results) => {
            if (err || results[0].length === 0) {
                reject(err);
                return;
            }

            var user = results[0][0];

            delete user.passwordSalt;
            delete user.passwordHash;

            resolve(user);
        });
    });
}

function verifyPassword(emailAddress, password) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spUserGetByEmail(?);';

        var params = [
            emailAddress
        ];

        pool.query(query, params, (err, results) => {
            if (err || results[0].length === 0) {
                reject(err);
                return;
            }

            var user = results[0][0];
            var hash = crypto.createHash('sha256').update(user.passwordSalt + password).digest('base64')

            if (hash === user.passwordHash) {
                resolve(user);
            } else {
                reject();
            }
        });
    });
}

module.exports = {
    get: get,
    create: create,
    verifyPassword: verifyPassword
};