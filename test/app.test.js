require('dotenv').config();
const request = require('supertest');
const app = require('../lib/app');
const db = require('../lib/mongo-connection');
const Aircraft = require('../lib/models/Aircraft');


describe('Aircraft E2E test', () => {

    it('creates an aircraft on post', () => {
        return request(app)
            .post('/api/aircrafts')
            .send({ type: 'A-10', nickname: 'Thunderbird', speed: 439, released: 1977, active: true })
            .then(res => expect(res.body).toEqual({ _id: expect.any(String), type: 'A-10', nickname: 'Thunderbird', speed: 439, released: 1977, active: true }));
    });



});


