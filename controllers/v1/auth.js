var router = require('express').Router(),
    auth = require('../../helpers/auth');

router.post('/login', auth.requireLogin, (req, res) => {
    res.status(200).json({
        token: auth.generateToken(req.user)
    });
});

router.post('/register', (req, res) => {
    var user = {
        emailAddress: req.body.emailAddress,
        password: req.body.password
    };

    db.users.create(user)
        .then(() => {
            res.status(200).json({
                token: auth.generateToken(req.user)
            });
        }).catch((err) => {
            res.sendStatus(400);
        });
});

module.exports = router;