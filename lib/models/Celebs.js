const db = require('../mongo-connector');
const { ObjectId } = require('mongodb');

class Celebs {

    create(name, job) {
        return db('celebs')
            .then(collection => {
                return collection.insertOne({
                    name,
                    job
                });
            })
            .then(result => result.ops[0]);
    }

    get(id) {
        return db('celebs')
            .then(collection => {
                return collection.findOne({ _id: ObjectId(id) });
            });
    }
    
    getAll() {
        return db('celebs')
            .then(collection => {
                return collection.find();
            })
            .then(celebsDocObject => celebsDocObject.toArray());
    }

    drop() {
        return db('celebs').then(collection => collection.deleteMany());
    }

}

module.exports = new Celebs();
