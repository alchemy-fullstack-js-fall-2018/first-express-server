const router = require('express').Router();
const Games = require('../models/Games');

module.exports = router
    .post('/', (req, res) => {
        const { title, numPlayers, minutesPerGame } = req.body;
        Games.create({ title, numPlayers, minutesPerGame }).then(event =>
            res.json(event)
        );
    })

    .get('/', (req, res) => {
        Games.getAll().then(events => res.json(events));
    })

    .get('/:id', (req, res) => {
        const { id } = req.params;
        Games.get(id).then(event => res.json(event));
    })

    .delete('/:id', (req, res)  => {
        const { id } = req.params;
        Games.delete(id).then(success => res.json(success));
    });