var router = require('express').Router(),
    db = require('../../data/db');

router.post('/', (req, res) => {
    var taxDeduction = {
        name: req.body.name,
        amount: req.body.amount
    };

    db.taxDeductions.create(taxDeduction)
        .then((taxDeductions) => {
            res.json(taxDeductions);
        })
        .catch((err) => {
            res.sendStatus(500);
        });
});

router.get('/', (req, res) => {
    db.taxDeductions.getAll()
        .then((taxDeductions) => {
            res.json(taxDeductions);
        })
        .catch((err) => {
            res.sendStatus(500);
        });
});

router.get('/:taxDeductionId', (req, res) => {
    db.taxDeductions.getById(req.params.taxDeductionId)
        .then((taxDeduction) => {
            if (taxDeduction) {
                res.json(taxDeduction);
            } else {
                res.sendStatus(404);
            }
        })
        .catch((err) => {
            res.sendStatus(500);
        });
});

router.put('/:taxDeductionId', (req, res) => {
    var taxDeduction = {
        id: req.params.taxDeductionId,
        name: req.body.name,
        amount: req.body.amount
    };

    db.taxDeductions.update(taxDeduction)
        .then((taxDeductions) => {
            res.json(taxDeductions);
        })
        .catch((err) => {
            res.sendStatus(500);
        });
});

router.delete('/:taxDeductionId', (req, res) => {
    db.taxDeductions.deleteById(req.params.taxDeductionId)
        .then((taxDeductions) => {
            res.json(taxDeductions);
        })
        .catch((err) => {
            res.sendStatus(500);
        });
})

module.exports = router;