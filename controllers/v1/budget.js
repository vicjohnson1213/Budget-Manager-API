var router = require('express').Router(),
    db = require('../../data/db');

function sendBudget(req, res) {
    var categoriesPromise = db.budgetCategories.getAll();
    var itemsPromise = db.budgetItems.getAll();

    Promise.all([categoriesPromise, itemsPromise])
        .then((results) => {
            var categories = results[0];
            var items = results[1];

            var budget = {
                categories: []
            };

            categories.forEach((category) => {
                var theseItems = items.filter(item => item.budgetCategoryId === category.id);

                budget.categories.push({
                    id: category.id,
                    name: category.name,
                    total: theseItems.reduce((a, i) => { return a + i.amount; }, 0),
                    items: theseItems
                });
            });

            budget.total = items.reduce((a, i) => { return a + i.amount; }, 0);

            res.json(budget);
        }).catch((err) => {
            res.sendStatus(500);
        });
}

router.get('/', sendBudget);

router.post('/categories', (req, res) => {
    var budgetCategory = {
        name: req.body.name
    };

    db.budgetCategories.create(budgetCategory)
        .then(() => {
            sendBudget(req, res);
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
            sendBudget(req, res);
        })
        .catch((err) => {
            res.sendStatus(500);
        });
});

router.delete('/categories/:categoryId', (req, res) => {
    db.budgetCategories.deleteById(req.params.categoryId)
        .then(() => {
            sendBudget(req, res);
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
            sendBudget(req, res);
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
            sendBudget(req, res);
        })
        .catch((err) => {
            res.sendStatus(500);
        });
});

router.delete('/items/:itemId', (req, res) => {
    db.budgetItems.deleteById(req.params.itemId)
        .then(() => {
            sendBudget(req, res);
        })
        .catch((err) => {
            res.sendStatus(500);
        });
});

module.exports = router;