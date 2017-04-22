var crypto = require('crypto'),

    config = require('../config/config')
    pool = require('./dbConnection').pool;

function generateAccessToken(user) {
    return new Promise((resolve, reject) => {
        var token = crypto.randomBytes(40).toString('hex');
        var query = 'CALL spAccessTokenCreate(?, ?)';

        var params = [
            user.id,
            token
        ];

        pool.query(query, params, (err, results) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(token);
        });
    });
}

function verifyAccessToken(token) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spAccessTokenGetUser(?)';

        var params = [token];

        pool.query(query, params, (err, results) => {
            if (err) {
                reject(err);
                return;
            }

            if (results[0].length > 0) {
                resolve(results[0][0]);
            } else {
                reject('Invalid access token');
            }
        });
    });
}

function rejectAccessToken(token) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spAccessTokenDelete(?)';

        var params = [token];

        pool.query(query, params, (err, results) => {
            if (err) {
                return reject(err);
            }

            resolve();
        });
    });
}

module.exports = {
    generateAccessToken: generateAccessToken,
    rejectAccessToken: rejectAccessToken,
    verifyAccessToken: verifyAccessToken
};