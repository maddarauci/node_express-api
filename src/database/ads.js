const {getDatabase} = require('./mongo');
const {ObjectId} = require('mongodb');

const collectionName = 'ads';

async function insertAd(ad) {
    const database = await getDatabase();
    const {insertedId} = await database.collection(collectionName).insertOne(ad);
    return insertedId;
}
