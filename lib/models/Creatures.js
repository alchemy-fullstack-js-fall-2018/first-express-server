const db = require('../mongo-connector');
const { ObjectId } = require('mongodb');

class Creature {
    create(creature) {
        return db('creatures')
            .then(collection => {
                return collection.insertOne(creature);
            })
            .then(results => results.ops[0]);
    }

    getAll() {
        return db('creatures')
            .then(collection => {
                return collection.find();
            })
            .then(results =>  results.toArray());
    }

    get(id) {
        return db('creatures').then(collection => {
            return collection.findOne({ _id: ObjectId(id) });
        });
    }


}

module.exports = new Creature();
