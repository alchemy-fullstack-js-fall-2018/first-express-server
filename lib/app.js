const express = require('express');
const app = express();
const games = require('./routes/video-games');

app.use(express.json());
app.use('/api/video-games', games);

module.exports = app;
