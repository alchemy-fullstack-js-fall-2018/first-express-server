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
            .post('/api/authors')
            .send(author)
            .then(author => author.body);
    };

    beforeEach(() => {
        return db('authors').then(collection => collection.deleteMany());
    });

    beforeEach(() => {
        return Promise.all(authors.map(authorCreator))
            .then(authors => {
                createdAuthors = authors;
            });
    });

    it('creates an author', () => {
        return request(app)
            .post('/api/authors')
            .send({ firstName: 'Stephen', lastName: 'King' })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    firstName: 'Stephen',
                    lastName: 'King'
                });
            });
    });

    it('gets all authors', () => {
        return request(app)
            .get('/api/authors')
            .then(res => {
                expect(res.body).toEqual(createdAuthors);
            });
    });
    
    it('gets an author by id', () => {
        return request(app)
            .get(`/api/authors/${createdAuthors[0]._id}`)
            .then(res => {
                expect(res.body).toEqual(createdAuthors[0]);
            });
    });
    
    it('deletes an author by id', () => {
        return request(app)
            .delete(`/api/authors/${createdAuthors[0]._id}`)
            .then(() => Authors.getAll())
            .then(() => {
                return request(app).get(`/authors/${createdAuthors[0]._id}`)
                    .then(res => {
                        expect(res.body[0]).toBeFalsy();
                    });
            });
    });

    it('updates an author by id', () => {
        const updatedAuthor = { firstName: 'Ursula', lastName: 'LeGuin' };
        return request(app).put(`/api/authors/${createdAuthors[0]._id}`)
            .send(updatedAuthor)
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    firstName: 'Ursula',
                    lastName: 'LeGuin'
                });
            });
    });
});
