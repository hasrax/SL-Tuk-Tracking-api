// src/config/db.js
const mongoose = require("mongoose");
const env = require("./env");

async function connectDb() {
  if (!env.mongoUri) {
    throw new Error("MONGODB_URI is missing in .env");
  }

  await mongoose.connect(env.mongoUri, {
    autoIndex: true
  });
}

module.exports = { connectDb };