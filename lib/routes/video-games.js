const router = require('express').Router();
const VideoGames = require('../models/Video-games');

module.exports = router
    .post('/', (req, res) => {
        const { type, customerId, purchaseId } = req.body;
        VideoGames.create({ type, customerId, purchaseId }).then(game =>
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

