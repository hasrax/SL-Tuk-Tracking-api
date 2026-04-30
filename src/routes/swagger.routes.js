const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("../config/swagger");

const router = express.Router();

router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = router;