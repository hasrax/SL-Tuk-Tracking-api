// src/server.js
const app = require("./app");
const env = require("./config/env");
const { connectDb } = require("./config/db");

async function startServer() {
  try {
    await connectDb();
    app.listen(env.port, () => {
      console.log(`API listening on port ${env.port}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err.message);
    process.exit(1);
  }
}

startServer();