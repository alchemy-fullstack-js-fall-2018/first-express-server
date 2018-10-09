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

    drop() {
        return db('aircraft').then(collection => collection.deleteMany());
    }


}


module.exports = new Aircraft();
