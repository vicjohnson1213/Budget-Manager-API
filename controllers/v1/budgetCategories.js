var router = require('express').Router(),
    db = require('../../data/db'),
    dto = require('../../helpers/dto');

router.post('/', (req, res) => {
    var budgetCategory = {
        name: req.body.name
    };

    db.budgetCategories.create(budgetCategory)
        .then(() => {
            dto.buildBudget()
                .then(budget => { res.json(budget); });
        })
        .catch((err) => {
            res.sendStatus(500);
        });
});

router.get('/', (req, res) => {
    db.budgetCategories.getAll()
        .then((categories) => {
            if (categories) {
                res.json(categories);
            }
        })
        .catch((err) => {
            res.sendStatus(500);
        });
});

router.get('/:budgetCategoryId', (req, res) => {
    db.budgetCategories.getById(req.params.budgetCategoryId)
        .then((category) => {
            if (categories) {
                res.json(category);
            } else {
                res.sendStatus(404);
            }
        })
        .catch((err) => {
            res.sendStatus(500);
        });
});

router.put('/:budgetCategoryId', (req, res) => {
    var budgetCategory = {
        id: req.params.budgetCategoryId,
        name: req.body.name
    };

    db.budgetCategories.update(budgetCategory)
        .then(() => {
            dto.buildBudget()
                .then(budget => { res.json(budget); });
        })
        .catch((err) => {
            res.sendStatus(500);
        });
});

router.delete('/:budgetCategoryId', (req, res) => {
    db.budgetCategories.deleteById(req.params.budgetCategoryId)
        .then(() => {
            dto.buildBudget()
                .then(budget => { res.json(budget); });
        })
        .catch((err) => {
            res.sendStatus(500);
        });
})

module.exports = router;