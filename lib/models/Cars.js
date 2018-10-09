const db = require('../mongo-connector');
const { ObjectId } = require('mongodb');

class Cars {

    create(car) {
        return db('cars')
            .then(collection => {
                return collection.insertOne(car);
            })
            .then(results => results.ops[0]);
    }

    getAll() {
        return db('cars')
            .then(collection => {
                return collection.find();
            })
            .then(results => results.toArray());
    }

    get(id) {
        return db('cars').then(collection => {
            return collection.findOne({ _id: ObjectId(id) });
        });
    }

    update(id, name) {
        return db('restaurants')
            .then(collection => {
                return collection.findOne({ _id: ObjectId(id) });
            })
            .then(collection => {
                return collection.findOneAndUpdate(
                    { _id: ObjectId(id) },
                    { $set: name },
                );
            })
            .then(res => res.value);
    }

    delete(id, name) {
        return db('restaurants')
            .then(collection => {
                return collection.findOne({ _id: ObjectId(id) });
            })
            .then(collection => {
                return collection.remove(
                    { _id: ObjectId(id) },
                    { $set: name },
                );
            })
            .then(res => res.value);
    }


}

module.exports = new Cars();
// * `GET /<resource>` - returns array of all of the resources
// * `POST /<resource>` - inserts the supplied request body as a document into the resource collection
// * `GET /<resource>/:id` -
//   * returns the single object specified by the id
// * `DELETE /<resource>/:id` - removes the resource with that id
//   * **not** an error if doesn't exist. 
// * `PUT /<resource>/:id` - updates the resource with supplied request body
