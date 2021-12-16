// src/index.js

// dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { startDatabase } = require('../database/mongo');
const { insertAd } = require('../database/ads');
const { deletedAd, updateAd} = require('./database/ads');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

// defining the Express app
const app = express();

// adding helmet to enhance your api's security 
app.use(helmet());
// body-parser to parse json bodies into js objects
app.use(bodyParser.json());
// enable CORS for all requests
app.use(cors());
// adding morgan to log http requests
app.use(morgan('combined'));
// defining an endpoint to return all ads

app.get('/', async (req, res) => {
    res.send(await getAds());
});

const checkJwt = jwt({
    secrect: jwtRsa.expressJwtSecrect({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://blog-sample.auth0.com/.well-known/jwks.json'
    }),

    // validate the audience and the issuer.
    audience: 'https://ads-api',
    issue: `https://blog-sample.auth0.com/`,
    algorithms: ['RS256']
});

app.use(checkJwt);

app.post('/', async (req, res) => {
    const newAd = req.body;
    await insertAd(newAd);
    res.send({ message: 'New ad inserted.' });
});

// endpoint to delete an ad 
app.delete('/:id', async (req, res) => {
    await deletedAd(req.params.id);
    res.send({ message: 'Ad removed.' });
});

// endpoint to update an ad
app.put('/:id', async (req, res) => {
    const updateAd = req.body;
    await updateAd(req.params.id, updateAd);
    res.send({ message: 'Ad updated.' });
});

// start the in-memory MongoDB instance
startDatabase().then(async () => {
    await insertAd({title: 'Hello, now from the in-memory  database!'});

    // start the server 
    app.listen(3001, async () => {
        console.log('listening on port 3001');
    });
})