const router = require('express').Router();
const Bars = require('../models/Bars');

module.exports = router

    .post('/', (req, res) => {
        const { name, quadrant, hasPatio } = req.body;
        Bars.create({ name, quadrant, hasPatio }).then(bar => {
            res.json(bar);
        });
    })

    .get('/', (req, res) => {
        Bars.getAll().then(bars => res.json(bars));
    })

    .get('/:id', (req, res) => {
        const { id } = req.params;
        Bars.get(id).then(bar => res.json(bar));
    })

    .put('/:id', (req, res) => {
        const { id } = req.params;
        const hasPatio = req.body;
        Bars.update(id, hasPatio)
            .then(bar => res.json(bar));
    })

    .delete('/:id', (req, res) => {
        const { id } = req.params;
        Bars.delete(id).then(res.send.bind(res));
    })

    
