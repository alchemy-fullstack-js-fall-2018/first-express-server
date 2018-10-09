const router = require('express').Router();
const Creatures = require('../models/Creatures');

module.exports = router
    .post('/', (req, res) => {
        const { species, depth } = req.body;
        Creatures.create({ species, depth }).then(creature =>
            res.json(creature) //what is happening hereeee
        );
    })

    .get('/', (req, res) => {
        Creatures.getAll().then(creatures => res.json(creatures));
    })

    .get('/:id', (req, res) => {
        const { id } = req.params;
        Creatures.get(id).then(creature => res.json(creature));
    })

    .delete('/:id', (req, res) => {
        const { id } = req.params;
        Creatures.delete(id)
            .then(creature => res.json(creature));
    });

// .put = (req, res) => {
//     const { id } = req.params;
//     const depth = req.body;
//     Creatures.update(id, depth)
//         .then(res.send);
// };
