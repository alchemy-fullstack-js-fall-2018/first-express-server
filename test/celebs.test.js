require('dotenv').config();
const Celebs = require('../lib/models/Celebs');

let createdCelebs;

beforeEach(() => {
    return Celebs.drop();
});

beforeEach(() => {
        
    return Promise.all([
        Celebs.create('James Bond', 'Spy'),
        Celebs.create('Pele', 'Soccer Star')
    ])
        .then(ds => createdCelebs = ds);
});

describe('Celebs', () => {
    it('creates a celeb in my db', () => {
        return Celebs.create('Jack Sparrow', 'Pirate')
            .then(createdCeleb => {
                expect(createdCeleb).toHaveProperty('_id');
                expect(createdCeleb.name).toEqual('Jack Sparrow');
                expect(createdCeleb.job).toEqual('Pirate');
            });
    });
});
