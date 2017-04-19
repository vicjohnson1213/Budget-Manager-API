var router = require('express').Router(),
    db = require('../../data/db')
    dto = require('../../helpers/dto');

router.get('/', (req, res) => {
    db.taxCredits.getAll(req.user.id)
        .then((taxCredits) => {
            res.json(taxCredits);
        })
        .catch((err) => {
            res.sendStatus(500);
        });
});

router.get('/:taxCreditId', (req, res) => {
    db.taxCredits.getById(req.user.id, req.params.taxCreditId)
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

    db.taxCredits.create(req.user.id, taxCredit)
        .then(() => {
            return dto.buildFinances(req.user.id);
        })
        .then((finances) => res.json(finances))
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

    db.taxCredits.update(req.user.id, taxCredit)
        .then(() => {
            return dto.buildFinances(req.user.id);
        })
        .then((finances) => res.json(finances))
        .catch((err) => {
            res.sendStatus(500);
        });
});

router.delete('/:taxCreditId', (req, res) => {
    db.taxCredits.deleteById(req.user.id, req.params.taxCreditId)
        .then(() => {
            return dto.buildFinances(req.user.id);
        })
        .then((finances) => res.json(finances))
        .catch((err) => {
            res.sendStatus(500);
        });
})

module.exports = router;