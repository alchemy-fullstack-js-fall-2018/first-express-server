const router = require('express').Router();
const Aircraft = require('../models/Aircraft');

module.exports = router


    .post('/', (req, res) => {
        const { type, nickname, speed, released, active } = req.body;
        Aircraft.create({ type, nickname, speed, released, active }).then(event =>
            res.json(event)
        );
    });

