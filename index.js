// environment variables
require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const router = require('./router');

// connect to mongodb
mongoose.connect(process.env.MONGO_URL);

const app = express();

// middleware
app.use(bodyParser.json());
app.use(cookieParser());


const port = process.env.PORT || 5000;
// create server routes here
router(app);

app.listen(port, () => console.log(`Server listening on port ${port}`));

