// environment variables
require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const router = require('./router.js');
const defineSockets = require('./rooms/defineSockets.js');

// connect to mongodb
mongoose.connect(process.env.MONGO_URL);

// define express app
const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 5000;
// create server routes here
router(app);

const server = app.listen(port, () => console.log(`Server listening on port ${port}`));
const io = require('socket.io')(server);
defineSockets(io, app);

