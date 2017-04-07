var router = require('express').Router(),
    db = require('../../data/db'),
    dto = require('../../helpers/dto');

router.get('/', (req, res) => {
    db.taxExemptions.getAll()
        .then((taxExemptions) => {
            res.json(taxExemptions);
        })
        .catch((err) => {
            res.sendStatus(500);
        });
});

router.get('/:taxExemptionId', (req, res) => {
    db.taxExemptions.getById(req.params.taxExemptionId)
        .then((taxExemption) => {
            if (taxExemption) {
                res.json(taxExemption);
            } else {
                res.sendStatus(404);
            }
        })
        .catch((err) => {
            res.sendStatus(500);
        });
});

router.post('/', (req, res) => {
    var taxExemption = {
        name: req.body.name,
        amount: req.body.amount
    };

    db.taxExemptions.create(taxExemption)
        .then(() => {
            dto.buildFinances()
                .then((finances) => res.json(finances));
        })
        .catch((err) => {
            res.sendStatus(500);
        });
});

router.put('/:taxExemptionId', (req, res) => {
    var taxExemption = {
        id: req.params.taxExemptionId,
        name: req.body.name,
        amount: req.body.amount
    };

    db.taxExemptions.update(taxExemption)
        .then(() => {
            dto.buildFinances()
                .then((finances) => res.json(finances));
        })
        .catch((err) => {
            res.sendStatus(500);
        });
});

router.delete('/:taxExemptionId', (req, res) => {
    db.taxExemptions.deleteById(req.params.taxExemptionId)
        .then(() => {
            dto.buildFinances()
                .then((finances) => res.json(finances));
        })
        .catch((err) => {
            res.sendStatus(500);
        });
})

module.exports = router;