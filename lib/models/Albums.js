const db = require('../mongo-connector');
// const { ObjectId } = require('mongodb');

class Albums {
    create(album) {
        return db('albums')
            .then(collection => {
                return collection.insertOne(album);
            })
            .then(results => results.ops[0]);
    }
}

module.exports = new Albums();
