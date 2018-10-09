require('dotenv').config();
const request = require('supertest');
const app = require('../lib/app');
const db = require('../lib/mongo-connector');
const Chance = require('chance');
const chance = new Chance();

describe('array of insects', () => {
    let insects = Array.apply(null, { length: 20 }).map(() => {
        return {
            type: '6 legs',
        };
    });
    
    let createdInsects;
    
    const createdInsect = insect => {
        return request(app)
            .post('/api/insects')
            .send(insect)
            .then(res => res.body);
    };
    
    beforeEach(() => {
        return db('insects').then(collection => collection.deleteMany());
    });
    
    beforeEach(() => {
        return Promise.all(insects.map(createdInsect)).then(insectsRes => {
            createdInsects = insectsRes;
        });
    });
    
    it('creates an insect on post', () => {
        return request(app)
            .post('/api/insects')
            .send({
                type: '6 legs',
            })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    type: '6 legs',
                });
            });
    });

    it('gets all insects on get', () => {
        return request(app)
            .get('/api/insects')
            .then(retrievedInsects => {
                createdInsects.forEach(createdInsect => {
                    expect(retrievedInsects.body).toContainEqual(createdInsect);
                });
            });
    });
    it('gets an insect by id', () => {
        return request(app)
            .get(`/api/insects/${createdInsects[0]._id}`)
            .then(res => {
                expect(res.body).toEqual(createdInsects[0]);
            });
    });
    
});
