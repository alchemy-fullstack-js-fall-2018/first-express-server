const db = require('../mongo-connection');
const { ObjectId } = require('mongodb');


class Aircraft {


    get(id) {
        return db('aircraft')
            .then(collection => collection.findOne({ _id: ObjectId(id) }));
    }

    getAll(query) {
        return db('aircraft')
            .then(collection => collection.find(query))
            .then(aircraftDocObject => aircraftDocObject.toArray());
    }

    create(data) {
        return db('aircraft')
            .then(collection => {
                return collection.insertOne({
                    type: data.type,
                    nickname: data.nickname,
                    speed: data.speed,
                    released: data.released,
                    active: data.active
                });
            })
            .then(result => result.ops[0]);
    }

    update(id, data) {
        return db('aircraft')
            .then(collection => {

                const update = {};
                for(let key in data) update[key] = data[key];

                return collection.findOneAndUpdate(
                    { _id: ObjectId(id) },
                    { $set: update },
                    { returnOriginal: false }
                );
            })
            .then(result => result.value);
    }

    delete(id) {
        return db('aircraft')
            .then(collection => collection.findOneAndDelete({ _id: ObjectId(id) }))
            .then(result => result.value);
    }

    drop() {
        return db('aircraft').then(collection => collection.deleteMany());
    }


}


module.exports = new Aircraft();
