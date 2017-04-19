var router = require('express').Router(),
    db = require('../../data/db'),
    dto = require('../../helpers/dto');

router.get('/', (req, res) => {
    db.taxDeductions.getAll(req.user.id)
        .then((taxDeductions) => {
            res.json(taxDeductions);
        })
        .catch((err) => {
            res.sendStatus(500);
        });
});

router.get('/:taxDeductionId', (req, res) => {
    db.taxDeductions.getById(req.user.id, req.params.taxDeductionId)
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

router.post('/', (req, res) => {
    var taxDeduction = {
        name: req.body.name,
        amount: req.body.amount
    };

    db.taxDeductions.create(req.user.id, taxDeduction)
        .then(() => {
            return dto.buildFinances(req.user.id);
        })
        .then((finances) => res.json(finances))
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

    db.taxDeductions.update(req.user.id, taxDeduction)
        .then(() => {
            return dto.buildFinances(req.user.id);
        })
        .then((finances) => res.json(finances))
        .catch((err) => {
            res.sendStatus(500);
        });
});

router.delete('/:taxDeductionId', (req, res) => {
    db.taxDeductions.deleteById(req.user.id, req.params.taxDeductionId)
        .then(() => {
            return dto.buildFinances(req.user.id);
        })
        .then((finances) => res.json(finances))
        .catch((err) => {
            res.sendStatus(500);
        });
})

module.exports = router;