require('dotenv').config();
const request = require('supertest');
const app = require('../lib/app');
const db = require('../lib/mongo-connector');

describe('album DB', () => {

    let albums = [
        { band: 'Rolling Stones', albumName: 'Goats Head Soup' },
        { band: 'The Beatles', albumName: 'Revolver' }
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

    it('creates an album on post', () => {
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

    it('gets an album by id', () => {
        return request(app)
            .get(`/api/albums/${createdAlbums[1]._id}`)
            .then(res => {
                expect(res.body).toEqual(createdAlbums[1]);
            });
    });

    it('deletes an album by id', () => {
        return request(app)
            .delete(`/api/albums/${createdAlbums[1]._id}`)
            .then(res => {
                expect(res.body).toEqual({ removed: true }); 
            });
    });

    it('updates an album with supplied request body', () => {
        return request(app)
            .put(`/api/albums/${createdAlbums[0]._id}`)
            .send({ albumName: 'Wish You Were Here' })
            .then(res => {
                expect(res.body).toEqual({ ...createdAlbums[0], albumName: 'Wish You Were Here' });
            });
    });

    it('sends 404 error if supplied with incorrect URI', () => {
        return request(app)
            .get('/api/podcasts')
            .then(res => {
                expect(res.statusCode).toEqual(404);
            });
    });
});
