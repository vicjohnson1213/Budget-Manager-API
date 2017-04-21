var db = require('../data/db');

function serialize(req, res, next) {
    req.user = {
        id: req.body.id,
        emailAddress: req.body.emailAddress,
        password: req.body.password
    }

    next();
}

function create(req, res, next) {
    db.users.create(req.user)
        .then((user) => {
            req.user = user;
            next();
        }).catch(next);
}

module.exports = {
    serialize: serialize,
    create: create
};