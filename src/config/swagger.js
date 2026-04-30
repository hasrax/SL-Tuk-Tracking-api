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
      { url: "http://localhost:4000/api", description: "Local" }
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
  apis: ["./src/routes/*.js"]
};

module.exports = swaggerJSDoc(options);