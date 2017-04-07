var router = require('express').Router();

// router.use('/incomeSources', require('./incomeSources'));
// router.use('/taxExemptions', require('./taxExemptions'));
// router.use('/taxDeductions', require('./taxDeductions'));
// router.use('/taxCredits', require('./taxCredits'));
router.use('/transactions', require('./transactions'));
// router.use('/budgetCategories', require('./budgetCategories'));
// router.use('/budgetItems', require('./budgetItems'));
router.use('/finances', require('./finances'));
router.use('/budget', require('./budget'));


module.exports = router;