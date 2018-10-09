const router = require('express').Router();
const Celebs = require('../models/Celebs');

module.exports = router 

    .post('/', (req, res) => {
        const { name, job } = req.body;
        Celebs.create(name, job).then(celeb =>
            res.json(celeb)
        );
    })
    
    .get('/', (req, res) => {
        Celebs.getAll().then(celebs => res.json(celebs));
    })

    .get('/:id', (req, res) => {
        const { id } = req.params;
        Celebs.get(id).then(celeb => res.json(celeb));
    })

    .put('/:id', (req, res) => {
        const { id } = req.params;
        const name = req.body;
        Celebs.update(id, name).then(celeb => 
            res.json(celeb)       
        );
    })

    .delete('/:id', (req, res) => {
        const { id } = req.params;
        Celebs.delete(id).then(celeb => res.json(celeb));
    });
