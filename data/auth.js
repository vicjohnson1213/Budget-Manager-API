var crypto = require('crypto'),

    jwt = require('jsonwebtoken'),

    config = require('../config/config')
    pool = require('./dbConnection').pool;

function generateAccessToken(user) {  
    return jwt.sign(user, config.secret, {
        expiresIn: 3600
    });
}

function generateRefreshToken(user) {
    return new Promise((resolve, reject) => {
        var token = crypto.randomBytes(40).toString('hex');
        var query = 'CALL spRefreshTokenCreate(?, ?)';

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

function validateRefreshToken(token) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spRefreshTokenGetUser(?)';

        var params = [token];

        pool.query(query, params, (err, results) => {
            if (err) {
                reject(err);
                return;
            }

            if (results[0].length > 0) {
                resolve(results[0][0]);
            } else {
                reject('Invalid refresh token');
            }
        });
    });
}

function rejectRefreshToken(token) {
    return new Promise((resolve, reject) => {
        var query = 'CALL spRefreshTokenDelete(?)';

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
    generateRefreshToken: generateRefreshToken,
    validateRefreshToken: validateRefreshToken,
    rejectRefreshToken: rejectRefreshToken
};