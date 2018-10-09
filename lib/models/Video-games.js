const db = require('../mongo-connector');
const { ObjectId } = require('mongodb');

class VideoGames {
    create(game) {
        return db('videoGames')
            .then(collection => {
                return collection.insertOne(game);
            })
            .then(results => results.ops[0]);
    }

    getAll() {
        return db('videoGames')
            .then(collection => {
                return collection.find();
            })
            .then(games => games.toArray());
    }

    get(id) {
        return db('videoGames').then(collection => {
            return collection.findOne({ _id: ObjectId(id) });
        });
    }

    delete(id) {
        return db('videoGames').then(collection => {
            return collection.findOneAndDelete({ _id: ObjectId(id) });
        })
            .then(result => result.value);
    }
}

module.exports = new VideoGames();
