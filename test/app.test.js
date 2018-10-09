require('dotenv').config();
const request = require('supertest');
const app = require('../lib/app');
const db = require('../lib/mongo-connector');
const Chance = require('chance');
const chance = new Chance();

describe('deep sea creatures', () => {
    let creatures = Array.apply(null, { length: 100 }).map(() => {
        return {
            species: chance.guid({ version: 4 }),
            depth: chance.guid({ version: 4 })
        };
    });

    let createdCreatures;

    const createCreature = creature => {
        return request(app)
            .post('/api/creatures')
            .send(creature)
            .then(res => res.body);
    };

    beforeEach(() => {
        return db('creatures').then(collection => collection.deleteMany());
    });

    beforeEach(() => {
        return Promise.all(creatures.map(createCreature)).then(creaturesRes => {
            createdCreatures = creaturesRes;
        });
    });

    it('creates a deep sea creature on post', () => {
        return request(app)
            .post('/api/creatures')
            .send({
                species: 'Frilled Shark',
                depth: 'up to 1500 meters'
            })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    species: 'Frilled Shark',
                    depth: 'up to 1500 meters'
                });
            });
    });

    it('gets all creatures on get', () => {
        return request(app)
            .get('/api/creatures')
            .then(retrievedCreatures => {
                createdCreatures.forEach(createdCreature => {   
                    expect(retrievedCreatures.body).toContainEqual(createdCreature); //also dont know what's happening heree
                });
            });
    });

    it('gets a creature by id', () => {
        return request(app)
            .get(`/api/creatures/${createdCreatures[0]._id}`)
            .then(res => {
                expect(res.body).toEqual(createdCreatures[0]);
            });
    });

    // it('removes a particular resource', () => {
    //     return request(app)

    // })

});

