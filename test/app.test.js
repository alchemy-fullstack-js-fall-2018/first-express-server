require('dotenv').config();
const request = require('supertest');
const app = require('../lib/app');
const db = require('../lib/mongo-connector');
const Chance = require('chance');
const chance = new Chance();

describe('bar API', () => {
    let bars = Array.apply(null, { length: 100 }).map(() => {
        return {
            name: chance.guid({ version: 4 }),
            quadrant: chance.guid({ version: 4 }),
            hasPatio: chance.guid({ version: 4 })
        };
    });

    let createdBars;

    const createBar = bar => {
        return request(app)
            .post('/api/bars')
            .send(bar)
            .then(res => res.body);
    };

    beforeEach(() => {
        return db('bars').then(collection => collection.deleteMany());
    });

    beforeEach(() => {
        return Promise.all(bars.map(createBar)).then(barsRes => {
            createdBars = barsRes;
        });
    });

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

    it('gets all created bars', () => {
        return request(app)
            .get('/api/bars')
            .then(retrievedBars => {
                createdBars.forEach(createdBar => {
                    expect(retrievedBars.body).toContainEqual(createdBar);
                });
            });
    });

    it('gets a bar by id', () => {
        return request(app)
            .get(`/api/bars/${createdBars[0]._id}`)
            .then(res => {
                expect(res.body).toEqual(createdBars[0]);
            });
    });
});
