// src/index.js

// dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { startDatabase } = require('../database/mongo');
const { insertAd } = require('../database/ads');

// defining the Express app
const app = express();

app.get('/', async (req, res) => {
    res.send(await getAds());
});

/*
app.get('/', (req, res) => {
    res.send(ads);
});
*/

// in-memory MongoDB instance 
startDatabase().then(async () => {
    await insertAd({title: 'Hello, now from the in-memory database!'});

    // starting the server 
    app.listen(3001, () => {
        console.log('server listening on port 3001');
    });
});

// defining an array to work as the db (temporary solution)
const ads = [
    {title: 'hello, world'},
    {author: 'Dom'}
];

// adding helmet to enhance your api's security 
app.use(helmet());
// body-parser to parse json bodies into js objects
app.use(bodyParser.json());
// enable CORS for all requests
app.use(cors());
// adding morgan to log http requests
app.use(morgan('combined'));
// defining an endpoint to return all ads


console.log("hello, world!, again");