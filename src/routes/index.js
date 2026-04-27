const express = require("express");
const healthRoutes = require("./health.routes");
const authRoutes = require("./auth.routes");
const deviceAuthRoutes = require("./deviceAuth.routes");

const router = express.Router();

router.use(healthRoutes);
router.use(authRoutes);
router.use(deviceAuthRoutes);

module.exports = router;
