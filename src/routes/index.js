const express = require("express");
const healthRoutes = require("./health.routes");
const authRoutes = require("./auth.routes");
const deviceAuthRoutes = require("./deviceAuth.routes");
const locationRoutes = require("./location.routes");

const router = express.Router();

router.use(healthRoutes);
router.use(authRoutes);
router.use(deviceAuthRoutes);
router.use(locationRoutes);

module.exports = router;
