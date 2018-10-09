const db = require('../mongo-connector');
const { ObjectId } = require('mongodb');

class Albums {
    create(album) {
        return db('albums')
            .then(collection => {
                return collection.insertOne(album);
            })
            .then(results => results.ops[0]);
    }

    getAll() {
        return db('albums')
            .then(collection => {
                return collection.find();
            })
            .then(results => results.toArray());
    }

    get(id){
        return db('albums')
            .then(collection => {
                return collection.findOne({ _id: ObjectId(id) });
            });
    }
}

module.exports = new Albums();
