const router = require('express').Router();
const Albums = require('../models/Albums');

module.exports = router
    .post('/', (req, res) => {
        const { band, albumName } = req.body;
        Albums.create({ band, albumName }).then(event => 
            res.json(event)
        );
    })
    .get('/', (req, res) => {
        Albums.getAll().then(albums => res.json(albums));
    })
    .get('/:id', (req, res) => {
        const { id } = req.params;
        Albums.get(id).then(album => res.json(album));
    });
