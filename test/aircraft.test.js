require('dotenv').config();
const Aircraft = require('../lib/models/Aircraft');

describe('aircraft model', () => {

    it('creates a new aircraft in my db', () => {
        return Aircraft.create({ type: 'A-10', speed: 439, released: 1994, active: true })
            .then(createdAircraft => {
                expect(createdAircraft).toHaveProperty('_id');
                expect(createdAircraft.type).toEqual('A-10');
                expect(createdAircraft.speed).toEqual(439);
                expect(createdAircraft.released).toEqual(1994);
                expect(createdAircraft.active).toEqual(true);
            });
    });


});

