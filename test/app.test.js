require('dotenv').config();
const request = require('supertest');
const app = require('../lib/app');
const db = require('../lib/mongo-connector');

describe('album DB', () => {

    let albums = [
        { band: 'Rolling Stones', albumName: 'Goats Head Soup' },
        { band: 'The Beatles', albumName: 'Revolver'}
    ];

    let createdAlbums;

    const creator = album => {
        return request(app).post('/api/albums')
            .send(album);        
    };

    beforeEach(() => {
        return db('albums').then(collection => collection.deleteMany());
    });

    beforeEach(() => {
        return Promise.all(albums.map(creator))
            .then(as => {
                createdAlbums = as.map(a => a.body);
            });
    });

    it('creates an event on post', () => {
        return request(app)
            .post('/api/albums')
            .send({
                band: 'Pink Floyd',
                albumName: 'Division Bell',
            })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    band: 'Pink Floyd',
                    albumName: 'Division Bell'
                });
            });
    });

    it('gets all albums', () => {
        return request(app)
            .get('/api/albums')
            .then(retrievedAlbums => {
                createdAlbums.forEach(createdAlbum => {
                    expect(retrievedAlbums.body).toContainEqual(createdAlbum);
                });
            });
    });
});
