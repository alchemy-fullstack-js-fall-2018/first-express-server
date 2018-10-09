const db = require('../mongo-connector');
const { ObjectId } = require('mongodb');

class Games {
    create(game) {
        return db('games')
            .then(collection => {
                return collection.insertOne(game);
            })
            .then(results => results.ops[0]);
    }

    getAll() {
        return db('games')
            .then(collection => {
                return collection.find();
            })
            .then(results => results.toArray());
    }

    get(id) {
        return db('games').then(collection => {
            return collection.findOne({ _id: ObjectId(id) });
        });
    }

    delete(id) {
        return db('games')
            .then(collection => {
                return collection.deleteOne({ _id: ObjectId(id) });
            });
    }

    update(id, updatedGame) {
        return db('games').then(collection => {
            collection.updateOne(
                { _id: ObjectId(id) },
                { $set: updatedGame });
        });
    }
}

module.exports = new Games();
