var router = require('express').Router(),
    db = require('../../data/db'),
    dto = require('../../helpers/dto');

router.get('/', (req, res) => {
    dto.buildBudget(req.user.id)
        .then(budget => { res.json(budget); });
});

router.use('/categories', require('./budgetCategories'));
router.use('/items', require('./budgetItems'));

module.exports = router;