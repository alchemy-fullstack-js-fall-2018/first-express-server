const db = require('../mongo-connector');
// const { ObjectId } = require('mongodb');

class Authors {
    create(author) {
        console.log('author', author);
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
}

module.exports = new Authors();
