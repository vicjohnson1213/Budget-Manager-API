var router = require('express').Router(),
    db = require('../../data/db'),
    dto = require('../../helpers/dto');

router.post('/', (req, res) => {
    var budget = {
        budgetCategoryId: req.body.budgetCategoryId,
        name: req.body.name,
        amount: req.body.amount
    };

    db.budgetItems.create(req.user.id, budget)
        .then(() => {
            return dto.buildBudget(req.user.id);
        })
        .then(budget => { res.json(budget); })
        .catch((err) => {
            console.log(err)
            res.sendStatus(500);
        });
});

router.get('/', (req, res) => {
    db.budgetItems.getAll(req.user.id)
        .then((budgets) => {
            res.json(budgets);
        })
        .catch((err) => {
            res.sendStatus(500);
        });
});

router.get('/:budgetId', (req, res) => {
    db.budgetItems.getById(req.user.id, req.params.budgetId)
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
        budgetCategoryId: req.body.budgetCategoryId,
        name: req.body.name,
        amount: req.body.amount
    };

    db.budgetItems.update(req.user.id, budget)
        .then(() => {
            return dto.buildBudget(req.user.id);
        })
        .then(budget => { res.json(budget); })
        .catch((err) => {
            res.sendStatus(500);
        });
});

router.delete('/:budgetId', (req, res) => {
    db.budgetItems.deleteById(req.user.id, req.params.budgetId)
        .then(() => {
            return dto.buildBudget()
        })
        .then(budget => { res.json(budget); })
        .catch((err) => {
            res.sendStatus(500);
        });
});

module.exports = router;