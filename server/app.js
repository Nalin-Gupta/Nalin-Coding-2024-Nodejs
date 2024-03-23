'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const { MongoMemoryServer } = require('mongodb-memory-server');

const {connectToMongoDB} = require('./database/mongo.js')
const profileRoutes = require('./routes/profile.js');

const app = express();
const port =  process.env.PORT || 3000;

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(bodyParser.json());

app.use('/api/profiles', profileRoutes);

async function startServer() {
  try {
    await connectToMongoDB();

    const server = app.listen(port);
    console.log('Express started. Listening on %s', port);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}
startServer();



