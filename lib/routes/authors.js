const router = require('express').Router();
const Authors = require('../models/Authors');

module.exports = router
    .post('/', (req, res) => {
        const { firstName, lastName } = req.body;
        Authors.create({ firstName, lastName }).then(author => res.json(author));
    })

    .get('/', (req, res) => {
        Authors.getAll().then(authors => res.json(authors));
    });
