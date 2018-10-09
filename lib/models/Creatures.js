const db = require('../mongo-connector');
const { ObjectId } = require('mongodb');

class Creature {
    create(creature) {
        return db('creatures')
            .then(collection => {
                return collection.insertOne(creature);
            })
            .then(results => results.ops[0]);
    }

    getAll() {
        return db('creatures')
            .then(collection => {
                return collection.find();
            })
            .then(results =>  results.toArray());
    }

    get(id) {
        return db('creatures').then(collection => {
            return collection.findOne({ _id: ObjectId(id) });
        });
    }

    delete(id) {
        return db('creatures')
            .then(collection => {
                return collection.deleteOne({ _id: ObjectId(id) });
            })
            .then(result => {
                if(result.deletedCount > 0) return { removed: true };
                else return { removed: false };
            });
    }

    update(id, depth) {
        return db('creatures')
            .then(collection => {
                return collection.findOneAndUpdate(
                    { _id: ObjectId(id) },
                    { $set: depth },
                    { returnOriginal: false }
                );
            })
            .then(res => res.value);
    }


}

module.exports = new Creature();
