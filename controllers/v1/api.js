var router = require('express').Router(),
    auth = require('../../helpers/auth');

router.use('/transactions', auth.verify, require('./transactions'));
router.use('/finances', auth.verify, require('./finances'));
router.use('/budget', auth.verify, require('./budget'));
router.use('/users', require('./users'));
router.use('/auth', require('./auth'));

module.exports = router;