const db = require('../mongo-connector');
const { ObjectId } = require('mongodb');

class Bars {
    create(bar) {
        return db('bars')
            .then(collection => {
                return collection.insertOne(bar);
            })
            .then(results => results.ops[0]);
    }

}

module.exports = new Bars();
