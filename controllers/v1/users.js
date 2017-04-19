var router = require('express').Router()
    db = require('../../data/db');

router.post('/', (req, res) => {
    var user = {
        emailAddress: req.body.emailAddress,
        password: req.body.password
    };

    db.users.create(user)
        .then(() => {
            res.sendStatus(200);
        }).catch((err) => {
            console.log(err);
            res.sendStatus(400);
        });
});

module.exports = router;