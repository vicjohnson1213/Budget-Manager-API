var router = require('express').Router(),
    db = require('../../data/db');

router.post('/', (req, res) => {
    var transaction = {
        date: req.body.date,
        name: req.body.name,
        categoryId: req.body.categoryId,
        amount: req.body.amount
    };

    db.transactions.create(transaction)
        .then((transactions) => {
            res.json(transactions);
        })
        .catch((err) => {
            res.sendStatus(500);
        });
});

router.get('/', (req, res) => {
    var year = req.query.year,
        month = req.query.month;

    db.transactions.getMonth(year, month)
        .then((transactions) => {
            res.json(transactions);
        })
        .catch((err) => {
            res.sendStatus(500);
        });
});

router.get('/:transactionId', (req, res) => {
    db.transactions.getById(req.params.transactionId)
        .then((transaction) => {
            if (transaction) {
                res.json(transaction);
            } else {
                res.sendStatus(404);
            }
        })
        .catch((err) => {
            res.sendStatus(500);
        });
});

router.put('/:transactionId', (req, res) => {
    var transaction = {
        id: req.params.transactionId,
        date: req.body.date,
        name: req.body.name,
        categoryId: req.body.categoryId,
        amount: req.body.amount
    };

    db.transactions.update(transaction)
        .then((transactions) => {
            res.json(transactions);
        })
        .catch((err) => {
            res.sendStatus(500);
        });
});

router.delete('/:transactionId', (req, res) => {
    db.transactions.deleteById(req.params.transactionId)
        .then((transactions) => {
            res.json(transactions);
        })
        .catch((err) => {
            res.sendStatus(500);
        });
})

module.exports = router;