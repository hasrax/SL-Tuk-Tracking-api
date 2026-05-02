const express = require("express");
const swaggerUi = require("swagger-ui-express");

const router = express.Router();

router.use("/docs", swaggerUi.serve);

const serveSwagger = (req, res, next) => {
  try {
    const swaggerSpec = require("../config/swagger");
    return swaggerUi.setup(swaggerSpec, {
      customSiteTitle: "TukTuk Tracking API Docs",
    })(req, res, next);
  } catch (err) {
    console.error("Swagger generation failed:", err);
    console.error(err.stack);
    return res.status(500).json({
      message: "Swagger generation failed",
      error: err.message,
    });
  }
};


router.get("/docs", serveSwagger);
router.get("/docs/", serveSwagger);

module.exports = router;