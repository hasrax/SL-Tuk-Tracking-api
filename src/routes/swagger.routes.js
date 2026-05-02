const express = require("express");
const swaggerUi = require("swagger-ui-express");

const router = express.Router();

router.use("/docs", swaggerUi.serve);

router.get("/docs", (req, res, next) => {
  try {
    
    const swaggerSpec = require("../config/swagger");
    return swaggerUi.setup(swaggerSpec)(req, res, next);
  } catch (err) {
    console.error("Swagger generation failed:", err);
    return res.status(500).json({
      message: "Swagger generation failed",
      error: err.message,
    });
  }
});

module.exports = router;