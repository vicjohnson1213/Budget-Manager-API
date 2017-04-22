var passport = require('passport'),
    db = require('../data/db');

const requireAuth = passport.authenticate('bearer', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

function generateAccessToken(req, res, next) {
    db.auth.generateAccessToken(req.user)
        .then(token => {
            req.token = token;        
            next();
        }).catch(next);
}

function rejectAccessToken(req, res, next) {
    db.auth.rejectAccessToken(req.body.accessToken)
        .then(next)
        .catch(next);
}

module.exports = {
    requireLogin: requireLogin,
    requireAuth: requireAuth,
    generateAccessToken: generateAccessToken,
    rejectAccessToken: rejectAccessToken
};