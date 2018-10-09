const router = require('express').Router();
const Albums = require('../models/Albums');

module.exports = router
    .post('/', (req, res) => {
        const { band, albumName } = req.body;
        Albums.create({ band, albumName }).then(event => 
            res.json(event)
        );
    });
