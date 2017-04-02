var router = require('express').Router();

router.use('/incomeSources', require('./incomeSources'));
router.use('/taxExemptions', require('./taxExemptions'));
router.use('/taxDeductions', require('./taxDeductions'));
router.use('/taxCredits', require('./taxCredits'));
router.use('/expenseCategories', require('./expenseCategories'));
router.use('/transactions', require('./transactions'));
router.use('/budgets', require('./budgets'));

module.exports = router;