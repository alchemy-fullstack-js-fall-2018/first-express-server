const express = require('express');
const app = express();

app.use(express.json());

const games = require('./routes/video-games');
app.use('/api/video-games', games);

module.exports = app;
