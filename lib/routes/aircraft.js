const router = require('express').Router();
const Aircraft = require('../models/Aircraft');

module.exports = router

    .get('/:id', (req, res) => {
        const { id } = req.params;
        Aircraft.get(id).then(event => res.json(event));
    })

    .post('/', (req, res) => {
        const { type, nickname, speed, released, active } = req.body;
        Aircraft.create({ type, nickname, speed, released, active }).then(event =>
            res.json(event)
        );
    });

