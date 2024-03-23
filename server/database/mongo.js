// const { MongoClient } = require('mongodb');
const mongo           = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let client;
let mongod; 

async function connectToMongoDB() {
  if (!client) {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongo.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true , dbName : "Nalin-Boo" });
  }

  return client;
}

async function closeMongoDBConnection() {
  if (client) {
    await client.close();
    await mongod.stop();
    console.log('Closed MongoDB connection and stopped MongoDB Memory Server');
  }
}

module.exports = { connectToMongoDB, closeMongoDBConnection };
