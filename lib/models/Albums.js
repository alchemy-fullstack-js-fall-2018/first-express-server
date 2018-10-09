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

    get(id) {
        return db('albums')
            .then(collection => {
                return collection.findOne({ _id: ObjectId(id) });
            });
    }

    delete(id) {
        return db('albums')
            .then(collection => {
                return collection.deleteOne(
                    { _id: ObjectId(id) }
                );
            })
            .then(result => {
                if(result.deletedCount > 0) return { removed: true };
                else return { removed: false };
            });
    }

    update(id, changedValue) {
        return db('albums')
            .then(collection => {
                return collection.findOneAndUpdate(
                    { _id: ObjectId(id) },
                    { $set: changedValue },
                    { returnOriginal: false }
                );
            })
            .then(res => res.value);
    }
}

module.exports = new Albums();
