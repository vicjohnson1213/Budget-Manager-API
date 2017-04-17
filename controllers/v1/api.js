var router = require('express').Router();

router.use('/transactions', require('./transactions'));
router.use('/finances', require('./finances'));
router.use('/budget', require('./budget'));

module.exports = router;