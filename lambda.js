const serverless = require("serverless-http");
const app = require("./src/app");
const { connectDb } = require("./src/config/db");

let dbReady = false;
const handler = serverless(app);

module.exports.handler = async (event, context) => {
	context.callbackWaitsForEmptyEventLoop = false;

	if (!dbReady) {
		await connectDb();
		dbReady = true;
	}

	return handler(event, context);
};