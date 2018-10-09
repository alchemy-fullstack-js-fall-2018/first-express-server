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

    update(id, hasPatio) {
        return db('bars')
            .then(collection => {
                return collection.findOneAndUpdate(
                    { _id: ObjectId(id) },
                    { $set: hasPatio },
                    { returnOriginal: false }
                );
            })
            .then(res => res.value); 
    }

    delete(id) {
        return db('bars')
            .then(collection => {
                return collection.deleteOne({ _id: ObjectId(id) });
            })
            .then(result => {
                if(result.deletedCount > 0) return { removed: true };
                else return { removed: false };
            });
    }

}

module.exports = new Bars();
