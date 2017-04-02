var router = require('express').Router(),
    db = require('../../data/db');

router.post('/', (req, res) => {
    var budget = {
        categoryId: req.body.categoryId,
        amount: req.body.amount
    };

    db.budgets.create(budget)
        .then((budgets) => {
            res.json(budgets);
        })
        .catch((err) => {
            res.sendStatus(500);
        });
});

router.get('/', (req, res) => {
    db.budgets.getAll()
        .then((budgets) => {
            res.json(budgets);
        })
        .catch((err) => {
            res.sendStatus(500);
        });
})

router.get('/:budgetId', (req, res) => {
    db.budgets.getById(req.params.budgetId)
        .then((budget) => {
            if (budget) {
                res.json(budget);
            } else {
                res.sendStatus(404);
            }
        })
        .catch((err) => {
            res.sendStatus(500);
        });
});

router.put('/:budgetId', (req, res) => {
    var budget = {
        id: req.params.budgetId,
        categoryId: req.body.categoryId,
        amount: req.body.amount
    };

    db.budgets.update(budget)
        .then((budgets) => {
            res.json(budgets);
        })
        .catch((err) => {
            res.sendStatus(500);
        });
});

router.delete('/:budgetId', (req, res) => {
    db.budgets.deleteById(req.params.budgetId)
        .then((budgets) => {
            res.json(budgets);
        })
        .catch((err) => {
            res.sendStatus(500);
        });
})

module.exports = router;