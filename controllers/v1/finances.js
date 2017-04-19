var router = require('express').Router(),
    dto = require('../../helpers/dto');

router.get('/', (req, res) => {
    dto.buildFinances(req.user.id)
        .then((finances) => res.json(finances));
});

router.use('/incomeSources', require('./incomeSources'));
router.use('/taxExemptions', require('./taxExemptions'));
router.use('/taxDeductions', require('./taxDeductions'));
router.use('/taxCredits', require('./taxCredits'));

module.exports = router;