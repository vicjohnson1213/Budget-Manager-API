var router = require('express').Router(),
    db = require('../../data/db'),
    dto = require('../../helpers/dto');

router.get('/', (req, res) => {
    db.incomeSources.getAll(req.user.id)
        .then((sources) => {
            if (sources) {
                res.json(sources);
            }
        })
        .catch((err) => {
            res.sendStatus(500);
        });
});

router.get('/:incomeSourceId', (req, res) => {
    db.incomeSources.getById(req.user.id, req.params.incomeSourceId)
        .then((sources) => {
            if (sources) {
                res.json(sources);
            } else {
                res.sendStatus(404);
            }
        })
        .catch((err) => {
            res.sendStatus(500);
        });
});

router.post('/', (req, res) => {
    var incomeSource = {
        name: req.body.name,
        annualAmount: req.body.annualAmount
    };

    db.incomeSources.create(req.user.id, incomeSource)
        .then(() => {
            return dto.buildFinances(req.user.id)
        })
        .then((finances) => res.json(finances))
        .catch((err) => {
            res.sendStatus(500);
        });
});

router.put('/:incomeSourceId', (req, res) => {
    var incomeSource = {
        id: req.params.incomeSourceId,
        name: req.body.name,
        annualAmount: req.body.annualAmount
    };

    db.incomeSources.update(req.user.id, incomeSource)
        .then(() => {
            return dto.buildFinances(req.user.id);
        })
        .then((finances) => res.json(finances))
        .catch((err) => {
            res.sendStatus(500);
        });
});

router.delete('/:incomeSourceId', (req, res) => {
    db.incomeSources.deleteById(req.user.id, req.params.incomeSourceId)
        .then(() => {
            return dto.buildFinances(req.user.id);
        })
        .then((finances) => res.json(finances))
        .catch((err) => {
            res.sendStatus(500);
        });
})

module.exports = router;