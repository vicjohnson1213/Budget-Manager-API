var router = require('express').Router(),
    user = require('../../middleware/user'),
    auth = require('../../middleware/auth');

router.post('/register', user.serialize, user.create, auth.generateAccessToken, auth.generateRefreshToken, (req, res) => {
    res.json({
        user: req.user,
        token: req.token
    });
});

router.post('/login', auth.requireLogin, auth.generateAccessToken, auth.generateRefreshToken, (req, res) => {
    res.json(req.token);
});

router.post('/token', auth.validateRefreshToken, auth.generateAccessToken, (req, res) => {
    res.json(req.token);
});

router.post('/token/reject', auth.rejectRefreshToken, (req, res) => {
    res.sendStatus(204);
});

module.exports = router;