var passport = require('passport'),
    db = require('../data/db');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

function generateAccessToken(req, res, next) {
    req.token = req.token || {};

    req.token.accessToken = db.auth.generateAccessToken(req.user);

    next();
}

function generateRefreshToken(req, res, next) {
    if (req.query.permanent) {
        db.auth.generateRefreshToken(req.user)
            .then((token) => {
                req.token.refreshToken = token;
                next();
            });
    } else {
        next();
    }
}

function validateRefreshToken(req, res, next) {
    db.auth.validateRefreshToken(req.body.refreshToken)
        .then((user) => {
            req.user = user;
            next();
        }).catch(next);
}

function rejectRefreshToken(req, res, next) {
    db.auth.rejectRefreshToken(req.body.refreshToken)
        .then(next)
        .catch(next);
}

module.exports = {
    requireLogin: requireLogin,
    requireAuth: requireAuth,
    generateAccessToken: generateAccessToken,
    generateRefreshToken, generateRefreshToken,
    validateRefreshToken: validateRefreshToken,
    rejectRefreshToken: rejectRefreshToken
};