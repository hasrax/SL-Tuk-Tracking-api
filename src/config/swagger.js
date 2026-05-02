const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "TukTuk Tracking API",
      version: "1.0.0",
      description: "API documentation for TukTuk tracking system"
    },
    servers: [
  { url: process.env.SWAGGER_SERVER_URL || "http://localhost:4000/api", description: "API" }
   ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },
    security: [{ bearerAuth: [] }]
  },
  apis: [__dirname + "/../routes/*.js"]
};

module.exports = swaggerJSDoc(options);