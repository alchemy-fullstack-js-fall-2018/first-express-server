require('dotenv').config();
const request = require('supertest');
const app = require('../lib/app');
const Aircraft = require('../lib/models/Aircraft');


describe('Aircraft E2E test', () => {

    const aircrafts = [
        { type: 'AH-64', nickname: 'Apache', speed: 227, released: 1986, active: true },
        { type: 'F-16', nickname: 'Fighting Falcon', speed: 1500, released: 1978, active: true },
        { type: 'SR-71', nickname: 'Blackbird', speed: 2200, released: 1966, active: false }
    ];

    let createdAircrafts;

    const lockheedMartin = aircraft => {
        return request(app)
            .post('/aircrafts')
            .send(aircraft);
    };

    beforeEach(() => {
        Aircraft.drop();
    });
    beforeEach(() => {
        return Promise.all(aircrafts.map(lockheedMartin))
            .then(ca => createdAircrafts = ca.map(a => a.body));
    });

    // alt:
    // beforeEach(async() => {
    //     const ca = await Promise.all(aircrafts.map(lockheedMartin));
    //     return createdAircrafts = ca.map(a => a.body);
    // });

    it('get an aircraft by id', () => {
        return request(app)
            .get(`/aircrafts/${createdAircrafts[0]._id}`)
            .then(res => expect(res.body).toEqual(createdAircrafts[0]));
    });




});
