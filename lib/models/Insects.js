const db = require('../mongo-connector');
const { ObjectId } = require('mongodb');

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

    get(id) {
        return db('insects')
            .then(collection => {
                return collection.findOne({ _id: ObjectId(id) });
            });
    }

    delete(id) {
        return db('insects')
            .then(collection => {
                return collection.deleteOne({ _id: ObjectId(id) });
            });
    }
}

module.exports = new Insects();
