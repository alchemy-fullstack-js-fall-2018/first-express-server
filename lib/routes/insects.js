const router = require('express').Router();
const Insects = require('../models/Insects');

module.exports = router
    .post('/', (req, res) => {
        const { type } = req.body;
        Insects.create({ type }).then(insect =>
            res.json(insect)
        );
    })

    .get('/', (req, res) => {
        Insects.getAll().then(insects => res.json(insects));
    });
