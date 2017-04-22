var router = require('express').Router(),
    user = require('../../middleware/user'),
    auth = require('../../middleware/auth');

router.post('/register', user.serialize, user.create, auth.generateAccessToken, (req, res) => {
    res.json({
        user: req.user,
        accessToken: req.token
    });
});

router.post('/login', auth.requireLogin, auth.generateAccessToken, (req, res) => {
    res.json({
        accessToken: req.token
    });
});

router.post('/logout', auth.rejectAccessToken, (req, res) => {
    res.sendStatus(204);
});

module.exports = router;