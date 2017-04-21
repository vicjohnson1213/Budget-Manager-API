const passport = require('passport'),
    jwt = require('jsonwebtoken'),  
    config = require('../config/config');

function generateToken(user) {  
    return jwt.sign(user, config.secret, {
        expiresIn: 10080 // in seconds
    });
}

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

module.exports = {
    generateToken: generateToken,
    requireLogin: requireLogin,
    requireAuth: requireAuth
};