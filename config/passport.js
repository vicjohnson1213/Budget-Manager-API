var passport = require('passport'),
    JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    LocalStrategy = require('passport-local')

    db = require('../data/db'),
    config = require('../config/config');

const localOptions = { usernameField: 'emailAddress' };

const localLogin = new LocalStrategy(localOptions, function(emailAddress, password, done) {
    db.users.verifyPassword(emailAddress, password)
        .then((user) => {
            delete user.passwordSalt;
            delete user.passwordHash;

            done(null, user);
        }).catch(() => {
            callback('Invalid email address or password');
        });
});


const jwtOptions = {  
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: config.secret
};

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
    db.users.get(payload.emailAddress)
        .then((user) => {
            done(null, user);
        }).catch(() => {
            done(null, false);
        });
});


passport.use(jwtLogin);  
passport.use(localLogin); 