var router = require('express').Router(),
    db = require('../../data/db'),
    dto = require('../../helpers/dto');

router.get('/', (req, res) => {
    var currentDate = new Date();

    var year = req.query.year || currentDate.getFullYear(),
        month = req.query.month || (currentDate.getMonth() + 1);

    dto.buildTransactionSummary(req.user.id, year, month)
        .then((summary) => res.json(summary));
});

router.get('/:transactionId', (req, res) => {
    db.transactions.getById(req.user.id, req.params.transactionId)
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

router.post('/', (req, res) => {
    var currentDate = new Date();

    var year = req.query.year || currentDate.getFullYear(),
        month = req.query.month || (currentDate.getMonth() + 1);

    var transaction = {
        date: req.body.date,
        name: req.body.name,
        budgetItemId: req.body.budgetItemId,
        amount: req.body.amount
    };

    db.transactions.create(req.user.id, transaction)
        .then((transactions) => {
            return dto.buildTransactionSummary(req.user.id, year, month);
        })
        .then((summary) => res.json(summary))
        .catch((err) => {
            res.sendStatus(500);
        });
});

router.put('/:transactionId', (req, res) => {
    var currentDate = new Date();

    var year = req.query.year || currentDate.getFullYear(),
        month = req.query.month || (currentDate.getMonth() + 1);

    var transaction = {
        id: req.params.transactionId,
        date: req.body.date,
        name: req.body.name,
        budgetItemId: req.body.budgetItemId,
        amount: req.body.amount
    };

    db.transactions.update(req.user.id, transaction)
        .then((transactions) => {
            return dto.buildTransactionSummary(req.user.id, year, month);
        })
        .then((summary) => res.json(summary))
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
});

router.delete('/:transactionId', (req, res) => {
    var currentDate = new Date();

    var year = req.query.year || currentDate.getFullYear(),
        month = req.query.month || (currentDate.getMonth() + 1);

    db.transactions.deleteById(req.user.id, req.params.transactionId)
        .then((transactions) => {
            return dto.buildTransactionSummary(req.user.id, year, month);
        })
        .then((summary) => res.json(summary))
        .catch((err) => {
            res.sendStatus(500);
        });
})

module.exports = router;