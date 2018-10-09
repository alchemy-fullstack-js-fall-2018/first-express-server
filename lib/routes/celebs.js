const router = require('express').Router();
const Celebs = require('../models/Celebs');

module.exports = router 
    .post('/', (req, res) => {
        const { name, job } = req.body;
        Celebs.create(name, job).then(celeb =>
            res.json(celeb)
        );
    });
