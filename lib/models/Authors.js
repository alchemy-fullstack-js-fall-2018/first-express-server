const db = require('../mongo-connector');
// const { ObjectId } = require('mongodb');

class Authors {
    create(author) {
        console.log('author', author);
        return db('author')
            .then(collection => {
                return collection.insertOne(author);
            })
            .then(results => results.ops[0]);
    }
}

module.exports = new Authors();
