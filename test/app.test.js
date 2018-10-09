require('dotenv').config();
const request = require('supertest');
const app = require('../lib/app');
const db = require('../lib/mongo-connector');
const Chance = require('chance');
const chance = new Chance();

describe('bar API', () => {
    it('creates a bar on POST', () => {
        return request(app)
            .post('/api/bars')
            .send({
                name: 'Test Bar',
                quadrant: 'SE',
                hasPatio: false
            })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    name: 'Test Bar',
                    quadrant: 'SE',
                    hasPatio: false
                });
            });
    });
});
