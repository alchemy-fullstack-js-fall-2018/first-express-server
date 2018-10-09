require('dotenv').config();
const request = require('supertest');
const app = require('../lib/app');
const db = require('../lib/mongo-connector');
const Insects = require('insects');
const insect = new Insect();

describe('array of insects', () => {
    let insects = Array.apply(null, { length: 100 }).map(() => {
        return {
            type: '6 legs',
        };
    });
});
