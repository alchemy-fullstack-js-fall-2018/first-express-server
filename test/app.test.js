require('dotenv').config();
const request = require('supertest');
const app = require('../lib/app');
const db = require('../lib/mongo-connector');
const Authors = require('../lib/models/Authors');

describe('app authors', () => {
    const authors = [
        { firstName: 'Ursula', lastName: 'Leguin' },
        { firstName: 'Virginia', lastName: 'Woolf' },
        { firstName: 'Toni', lastName: 'Morrison' }
    ];

    let createdAuthors;

    const authorCreator = author => {
        return request(app)
            .post('api/authors')
            .send(author);
    };

    beforeEach(() => {
        return db('authors').then(collection => collection.deleteMany());
    });

    beforeEach(() => {
        return Promise.all(authors.map(authorCreator))
            .then(authors => {
                createdAuthors = authors.map(author => author.body);
            });
    });

    it('creates an author', () => {
        return request(app)
            .post('/api/authors')
            .send({ firstName: 'Ursula', lastName: 'Leguin' })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    firstName: 'Ursula',
                    lastName: 'Le Guin'
                });
            });
    });

    

    
});
