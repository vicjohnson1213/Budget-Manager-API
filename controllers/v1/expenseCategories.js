var router = require('express').Router(),
    db = require('../../data/db');

router.post('/', (req, res) => {
    var expenseCategory = {
        parentId: req.body.parentId,
        name: req.body.name
    };

    db.expenseCategories.create(expenseCategory)
        .then((categories) => {
            res.json(categories);
        })
        .catch((err) => {
            res.sendStatus(500);
        });
});

router.get('/', (req, res) => {
    db.expenseCategories.getAll()
        .then((categories) => {
            if (categories) {
                res.json(categories);
            }
        })
        .catch((err) => {
            res.sendStatus(500);
        });
})

router.get('/:expenseCategoryId', (req, res) => {
    db.expenseCategories.getById(req.params.expenseCategoryId)
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

router.put('/:expenseCategoryId', (req, res) => {
    var expenseCategory = {
        id: req.params.expenseCategoryId,
        parentId: req.body.parentId,
        name: req.body.name
    };

    db.expenseCategories.update(expenseCategory)
        .then((categories) => {
            if (categories) {
                res.json(categories);
            } else {
                res.sendStatus(404);
            }
        })
        .catch((err) => {
            res.sendStatus(500);
        });
});

router.delete('/:expenseCategoryId', (req, res) => {
    db.expenseCategories.deleteById(req.params.expenseCategoryId)
        .then((categories) => {
            res.json(categories);
        })
        .catch((err) => {
            res.sendStatus(500);
        });
})

module.exports = router;