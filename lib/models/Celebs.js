const db = require('../mongo-connector');

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

    drop() {
        return db('celebs').then(collection => collection.deleteMany());
    }

}

module.exports = new Celebs();
