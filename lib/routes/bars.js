const router = require('express').Router();
const Bars = require('../models/Bars');

module.exports = router

    .post('/', (req, res) => {
        const { name, quadrant, hasPatio } = req.body;
        Bars.create({ name, quadrant, hasPatio }).then(bar => {
            res.json(bar);
        });
    });

    
