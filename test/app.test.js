require('dotenv').config();
const request = require('supertest');
const app = require('../lib/app');
const db = require('../lib/mongo-connector');
const Chance = require('chance');
const chance = new Chance();


describe('event pub/sub API', () => {

    let games = Array.apply(null, { length: 100 }).map(() => {
        return {
            title: 'random game title',
            system: chance.guid({ version: 4 }),
            genre: chance.guid({ version: 4 })
        };
    });
    let createdGames;

    const createGame = game => {
        return request(app)
            .post('/api/video-games')
            .send(game)
            .then(res => res.body);
    };

    beforeEach(() => {
        return db('videoGames').then(collection => collection.deleteMany());
    });

    beforeEach(() => {
        return Promise.all(games.map(createGame)).then(gamesRes => {
            createdGames = gamesRes;
        });
    });

    it('creates an event on post', () => {
        return request(app)
            .post('/api/video-games')
            .send({
                title: 'Street Fighter',
                system: 'Arcade',
                genre: 'Fighting'
            })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    title: 'Street Fighter',
                    system: 'Arcade',
                    genre: 'Fighting'
                });
            });
    });

    it('gets all games on get', () => {
        return request(app)
            .get('/api/video-games')
            .then(retrievedGames => {
                createdGames.forEach(createdGames => {
                    expect(retrievedGames.body).toContainEqual(createdGames);
                });
            });
    });

    it('gets an event by id', () => {
        return request(app)
            .get(`/api/video-games/${createdGames[0]._id}`)
            .then(res => {
                expect(res.body).toEqual(createdGames[0]);
            });
    });

});
