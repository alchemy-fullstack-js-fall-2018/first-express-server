const { MongoClient } = require('mongodb');

const connection = MongoClient
    .connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(client => {
        console.log('mongodb connected');
        return client.db();
    });

module.exports = collection => {
    return connection.then(db => {
        return db.collection(collection);
    });
};
