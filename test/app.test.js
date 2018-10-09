require('dotenv').config();
const request = require('supertest');
const app = require('../lib/app');


describe('event pub/sub API', () => {

    it('creates an event on post', () => {
        return request(app)
            .post('/api/video-games')
            .send({
                type: 'purchase',
                customerId: '1234',
                purchaseId: '5678'
            })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    type: 'purchase',
                    customerId: '1234',
                    purchaseId: '5678'
                });
            });
    });

});
