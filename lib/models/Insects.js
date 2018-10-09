const db = require('../mongo-connector');
//const { ObjectId } = require('mongodb');

class Insects {
    create(insect) {
        return db('insects')
            .then(collection => {
                return collection.insertOne(insect);
            })
            .then(results => results.ops[0]);
    }

    getAll() {
        return db('insects')
            .then(collection => {
                return collection.find();
            })
            .then(results => results.toArray());
    }
}

module.exports = new Insects();
