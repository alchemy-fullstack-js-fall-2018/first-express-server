const router = require('express').Router();
const VideoGames = require('../models/Video-games');

module.exports = router
    .post('/', (req, res) => {
        const { title, system, genre } = req.body;
        VideoGames.create({ title, system, genre }).then(game =>
            res.json(game)
        );
    })

    .get('/', (req, res) => {
        VideoGames.getAll().then(games => res.json(games));
    })

    .get('/:id', (req, res) => {
        const { id } = req.params;
        VideoGames.get(id).then(game => res.json(game));
    });

