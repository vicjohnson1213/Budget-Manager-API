var passport = require('passport'),
    BasicStrategy = require('passport-http').BasicStrategy,
    db = require('../data/db');

passport.use(new BasicStrategy(
    function(emailAddress, password, callback) {
        db.users.verifyPassword(emailAddress, password)
            .then((user) => {
                delete user.passwordSalt;
                delete user.passwordHash;
                
                callback(null, user);
            }).catch(() => {
                callback('Invalid email address or password');
            });
    }
));

exports.verify = passport.authenticate('basic', { session : false });