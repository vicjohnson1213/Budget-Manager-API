var router = require('express').Router(),
    db = require('../../data/db'),
    dto = require('../../helpers/dto');

router.get('/', (req, res) => {
    dto.buildBudget()
        .then(budget => { res.json(budget); });
});

router.post('/categories', (req, res) => {
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

router.put('/categories/:categoryId', (req, res) => {
    var budgetCategory = {
        id: req.params.categoryId,
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

router.delete('/categories/:categoryId', (req, res) => {
    db.budgetCategories.deleteById(req.params.categoryId)
        .then(() => {
            dto.buildBudget()
                .then(budget => { res.json(budget); });
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
});

router.post('/items', (req, res) => {
    var budgetItem = {
        budgetCategoryId: req.body.budgetCategoryId,
        name: req.body.name,
        amount: req.body.amount,
        isMonthlyPayment: req.body.isMonthlyPayment || false
    };

    db.budgetItems.create(budgetItem)
        .then(() => {
            dto.buildBudget()
                .then(budget => { res.json(budget); });
        })
        .catch((err) => {
            res.sendStatus(500);
        });
});

router.put('/items/:itemId', (req, res) => {
    var budgetItem = {
        id: req.params.itemId,
        budgetCategoryId: req.body.budgetCategoryId,
        name: req.body.name,
        amount: req.body.amount,
        isMonthlyPayment: req.body.isMonthlyPayment || false
    };

    db.budgetItems.update(budgetItem)
        .then(() => {
            dto.buildBudget()
                .then(budget => { res.json(budget); });
        })
        .catch((err) => {
            res.sendStatus(500);
        });
});

router.delete('/items/:itemId', (req, res) => {
    db.budgetItems.deleteById(req.params.itemId)
        .then(() => {
            dto.buildBudget()
                .then(budget => { res.json(budget); });
        })
        .catch((err) => {
            res.sendStatus(500);
        });
});

module.exports = router;