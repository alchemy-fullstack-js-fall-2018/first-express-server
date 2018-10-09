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
    })

    .get('/:id', (req, res) => {
        const { id } = req.params;
        Insects.get(id).then(insect => res.json(insect));
    })

    .delete('/:id', (req, res) => {
        const { id } = req.params;
        Insects.delete(id).then(insect => res.json(insect));
    })

    .put('/:id', (req, res) => {
        const { type } = req.body;
        Insects.put({ type }).then(insect => res.json(insect));
    });
