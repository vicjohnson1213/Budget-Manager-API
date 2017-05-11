var passport = require('passport'),
    LocalStrategy = require('passport-local'),
    BearerStrategy = require('passport-http-bearer'),

    db = require('../data/db');

const localOptions = { usernameField: 'emailAddress' };

passport.use(new LocalStrategy(localOptions, function(emailAddress, password, done) {
    db.users.verifyPassword(emailAddress, password)
        .then((user) => {
            delete user.passwordSalt;
            delete user.passwordHash;

            done(null, user);
        }).catch(() => {
            callback('Invalid email address or password');
        });
}));

passport.use(new BearerStrategy(function(token, done) {
    db.auth.verifyAccessToken(token)
        .then((user) => {
            done(null, user);
        }).catch(done);
}));
