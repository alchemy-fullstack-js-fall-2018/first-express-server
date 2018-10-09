const request = require('supertest');
require('dotenv').config();
const app = require('../lib/app');
const Celebs = require('../lib/models/Celebs');

describe.only('celebs', () => {

    const celebs = [
        { name: 'James Bond', job: 'Spy' },
        { name: 'Pele', job: 'Soccer Star' }
    ];
    
    let createdCelebs;

    const creator = celeb => {
        return request(app).post('/api/celebs')
            .send(celeb);
    };

    beforeEach(() => {
        return Celebs.drop();
    });

    beforeEach(() => {
        return Promise.all(celebs.map(creator))
            .then(cs => {
                createdCelebs = cs.map(c => c.body);
            });
    });

    it('creates a new Celeb in our db', () => {
        return request(app).post('/api/celebs')
            .send({ name: 'Jack Sparrow', job: 'Pirate' })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    name: 'Jack Sparrow',
                    job: 'Pirate'
                });
            });
    });

    it('gets all Celebs in our db', () => {
        return request(app).get('/api/celebs')
            .then(retrievedCelebs => {
                createdCelebs.forEach(createdCeleb => {
                    expect(retrievedCelebs.body).toContainEqual(createdCeleb);
                });
            });
    });

    it('gets a Celeb by id in our db', () => {
        return request(app).get(`/api/celebs/${createdCelebs[0]._id}`)
            .then(res => {
                expect(res.body).toEqual(createdCelebs[0]);
            });
    });

});
