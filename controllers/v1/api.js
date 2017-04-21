var router = require('express').Router(),
    auth = require('../../middleware/auth');

router.use('/transactions', auth.requireAuth, require('./transactions'));
router.use('/finances', auth.requireAuth, require('./finances'));
router.use('/budget', auth.requireAuth, require('./budget'));
router.use('/auth', require('./auth'));

module.exports = router;