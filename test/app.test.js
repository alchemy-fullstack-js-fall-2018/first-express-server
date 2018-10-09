require('dotenv').config();
const request = require('supertest');
const app = require('../lib/app');
const db = require('../lib/mongo-connector');
const Chance = require('chance');
const chance = new Chance();

describe('all about cars', () => {

    let carsArray = Array.apply(null, { length: 100 }).map(() => {
        return {
            type: 'new',
            make: 'honda',
            year: chance.guid({ version: 4 }),
            models: chance.guid({ version: 4 }),
        };
    });

    let createdCars;

    const createCar = cars => {
        return request(app)
            .post('/api/cars')
            .send(cars)
            .then(res => res.body);        
    };

    beforeEach(() => {
        return db('cars').then(collection => collection.deleteMany());
    });

    beforeEach(() => {
        return Promise.all(carsArray.map(createCar)).then(carsResonse => {
            createdCars = carsResonse;
        });
    });

    it('creates new car info on post', () => {
        return request(app)
            .post('/api/cars')
            .send({
                type: 'new',
                make: 'honda',
                year: '2018',
                models: 'accord'
            })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    type: 'new',
                    make: 'honda',
                    year: '2018',
                    models: 'accord'
                });
            });
    });

    it('gets all cars on get', () => {
        return request(app)
            .get('/api/cars')
            .then(retrievedCars => {
                createdCars.forEach(createdCarsInformation => {
                    expect(retrievedCars.body).toContainEqual(createdCarsInformation);
                });
            });
    });

    it('gets a car by id', () => {
        return request(app)
            .get(`/api/cars/${createdCars[0]._id}`)
            .then(res => {
                expect(res.body).toEqual(createdCars[0]);
            });
    });

    it('updates car info', () => {

    });

    it('delete car info', () => {

    });

    it('returns 404 when there is no method', () => {
        return request(app)
            .patch('/error')
            .send({})
            .then(res => {
                expect(res.statusCode).toEqual(404);
            });
    });

    it('returns 404 when there is no route or a bad route', () => {
        return request(app).post('/error').then(res => {
            expect(res.statusCode).toEqual(404);
        });
    });

});
