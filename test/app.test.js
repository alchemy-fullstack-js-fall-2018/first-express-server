require('dotenv').config();
const request = require('supertest');
const app = require('../lib/app');
const db = require('../lib/mongo-connector');
const Chance = require('chance');
const chance = new Chance();


describe('VideoGames pub/sub API', () => {
    
    let createdGames;

    let games = Array.apply(null, { length: 25 }).map(() => {
        return {
            title: 'random game title',
            system: chance.guid({ version: 4 }),
            genre: chance.guid({ version: 4 })
        };
    });
    
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

    it('creates an game on post', () => {
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

    it('gets all games', () => {
        return request(app)
            .get('/api/video-games')
            .then(retrievedGames => {
                createdGames.forEach(createdGames => {
                    expect(retrievedGames.body).toContainEqual(createdGames);
                });
            });
    });

    it('gets a game by id', () => {
        return request(app)
            .get(`/api/video-games/${createdGames[0]._id}`)
            .then(res => {
                expect(res.body).toEqual(createdGames[0]);
            });
    });

    it('deletes a game', () => {
        return request(app)
            .delete(`/api/video-games/${createdGames[0]._id}`)
            .then(deletedGame => {
                return request(app)
                    .get(`/api/video-games/${deletedGame.body._id}`);
            })
            .then(res => {
                expect(res.body).toBeNull();
            });
    });

    it('updates a game', () => {
        return request(app)
            .put(`/api/video-games/${createdGames[5]._id}`)
            .send({ 
                title: 'Super Mario World',
                system: 'Super Nintendo',
                genre: 'Action Platformer' 
            })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    title: 'Super Mario World',
                    system: 'Super Nintendo',
                    genre: 'Action Platformer' 
                });
            });
    });
});
