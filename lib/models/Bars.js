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

    getAll() {
        return db('bars')
            .then(collection => {
                return collection.find();
            })
            .then(results => results.toArray());
    }

    get(id) {
        return db('bars')
            .then(collection => {
                return collection.findOne({ _id: ObjectId(id) });
            });
            
    }

}

module.exports = new Bars();
