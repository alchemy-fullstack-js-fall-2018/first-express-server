const db = require('../mongo-connector');
const { ObjectId } = require('mongodb');

class Authors {
    create(author) {
        return db('authors')
            .then(collection => {
                return collection.insertOne(author);
            })
            .then(results => results.ops[0]);
    }

    getAll() {
        return db('authors')
            .then(collection => {
                return collection.find();
            })
            .then(results => results.toArray());
    }

    get(id) {
        return db('authors').then(collection => {
            return collection.findOne({ _id: ObjectId(id) });
        });
    }

}

module.exports = new Authors();
