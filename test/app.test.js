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
        return request(app).post('/authors')
            .send(author);
    };

    beforeEach(() => {
        return Authors.drop();
    });

    beforeEach(() => {
        return Promise.all(authors.map(authorCreator))
            .then(authors => {
                createdAuthors = authors.map(author => author.body);
            });
    });

    
});

describe('error handling', () => {
    it('returns 404 when there is no method', () => {
        return request(app)
            .patch('/authors')
            .send({})
            .then(res => {
                expect(res.statusCode).toEqual(404);
            });
    });

    it('returns 404 when there is no route', () => {
        return request(app).get('/muons').then(res => {
            expect(res.statusCode).toEqual(404);
        });
    });
});
