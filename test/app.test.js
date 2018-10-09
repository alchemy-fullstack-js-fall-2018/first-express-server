require('dotenv').config();
const request = require('supertest');
const app = require('../lib/app');
const db = require('../lib/mongo-connector');

describe('game pub/sub API', () => {

    let seedGames = [
        { title: 'Blokus', numPlayers: 4, minutesPerGame: 30 },
        { title: 'Settlers of Catan', numPlayers: 4, minutesPerGame: 60 },
        { title: 'Chess', numPlayers: 2, minutesPerGame: 90 }
    ];

    let createdGames;

    const makeGame = game => {
        return request(app)
            .post('/games')
            .send(game)
            .then(res => res.body);
    };

    beforeEach(() => {
        return db('games').then(collection => collection.deleteMany());
    });

    beforeEach(() => {
        return Promise.all(seedGames.map(makeGame)).then(gamesRes => {
            createdGames = gamesRes;
        });
    });

    it('creates a game on post', () => {
        const newGame =  { title: 'Haunting', numPlayers: 6, minutesPerGame: 60 };
        return request(app)
            .post('/games')
            .send(newGame)
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    title: newGame.title,
                    numPlayers: newGame.numPlayers,
                    minutesPerGame: newGame.minutesPerGame
                });
            });
    });

    it('gets all games on get', () => {
        return request(app)
            .get('/games')
            .then(retrievedGames => {
                createdGames.forEach(createdGame => {
                    expect(retrievedGames.body).toContainEqual(createdGame);
                });
            });
    });

    it('gets a game by id', () => {
        return request(app)
            .get(`/games/${createdGames[0]._id}`)
            .then(res => {
                expect(res.body).toEqual(createdGames[0]);
            });
    });

    it('deletes a game by id', () => {
        return request(app)
            .delete(`/games/${createdGames[0]._id}`)
            .then (() => request(app).get(`/games/${createdGames[0]._id}`))
            .then(res => {
                expect(res.body).toEqual(null);
            });
    });

    it('updates a game by id', () => {
        const updatedGame = { title: 'The Settlers of Catan', numPlayers: 6, minutesPerGame: 45 };
        return request(app)
            .put(`/games/${createdGames[1]._id}`)
            .send(updatedGame)
            .then (() => request(app).get(`/games/${createdGames[1]._id}`))
            .then(res => {
                expect(res.body.title).toEqual(updatedGame.title);
            });
    });

});