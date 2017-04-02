var router = require('express').Router(),
    db = require('../../data/db');

router.post('/', (req, res) => {
    var incomeSource = {
        name: req.body.name,
        annualAmount: req.body.annualAmount
    };

    db.incomeSources.create(incomeSource)
        .then((sources) => {
            res.json(sources);
        })
        .catch((err) => {
            res.sendStatus(500);
        });
});

router.get('/', (req, res) => {
    db.incomeSources.getAll()
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
    db.incomeSources.getById(req.params.incomeSourceId)
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

router.put('/:incomeSourceId', (req, res) => {
    var incomeSource = {
        id: req.params.incomeSourceId,
        name: req.body.name,
        annualAmount: req.body.annualAmount
    };

    db.incomeSources.update(incomeSource)
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

router.delete('/:incomeSourceId', (req, res) => {
    db.incomeSources.deleteById(req.params.incomeSourceId)
        .then((sources) => {
            res.json(sources);
        })
        .catch((err) => {
            res.sendStatus(500);
        });
})

module.exports = router;