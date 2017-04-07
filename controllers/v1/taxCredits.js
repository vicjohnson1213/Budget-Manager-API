var router = require('express').Router(),
    db = require('../../data/db')
    dto = require('../../helpers/dto');

router.get('/', (req, res) => {
    db.taxCredits.getAll()
        .then((taxCredits) => {
            res.json(taxCredits);
        })
        .catch((err) => {
            res.sendStatus(500);
        });
});

router.get('/:taxCreditId', (req, res) => {
    db.taxCredits.getById(req.params.taxCreditId)
        .then((taxCredit) => {
            if (taxCredit) {
                res.json(taxCredit);
            } else {
                res.sendStatus(404);
            }
        })
        .catch((err) => {
            res.sendStatus(500);
        });
});

router.post('/', (req, res) => {
    var taxCredit = {
        name: req.body.name,
        amount: req.body.amount
    };

    db.taxCredits.create(taxCredit)
        .then(() => {
            dto.buildFinances()
                .then((finances) => res.json(finances));
        })
        .catch((err) => {
            res.sendStatus(500);
        });
});

router.put('/:taxCreditId', (req, res) => {
    var taxCredit = {
        id: req.params.taxCreditId,
        name: req.body.name,
        amount: req.body.amount
    };

    db.taxCredits.update(taxCredit)
        .then(() => {
            dto.buildFinances()
                .then((finances) => res.json(finances));
        })
        .catch((err) => {
            res.sendStatus(500);
        });
});

router.delete('/:taxCreditId', (req, res) => {
    db.taxCredits.deleteById(req.params.taxCreditId)
        .then(() => {
            dto.buildFinances()
                .then((finances) => res.json(finances));
        })
        .catch((err) => {
            res.sendStatus(500);
        });
})

module.exports = router;