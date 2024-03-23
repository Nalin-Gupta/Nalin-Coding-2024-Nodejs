"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const { MongoMemoryServer } = require("mongodb-memory-server");

const { connectToMongoDB } = require("./database/mongo.js");
const profileRoutes = require("./routes/profile.js");
const commentRoutes = require("./routes/comment.js");

const app = express();
const port = process.env.NODE_ENV ? 3000 : process.env.PORT || 3000;

// set the view engine to ejs
app.set("view engine", "ejs");
app.use(bodyParser.json());

app.use("/api/profiles", profileRoutes);
app.use('/api/comments', commentRoutes);

async function startServer() {
  try {
    await connectToMongoDB();
    if(process.env.NODE_ENV != "test"){
      const server = app.listen(port);
      console.log("Express started. Listening on %s", port);
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
startServer();

module.exports = app;
