const express = require("express");
const healthRoutes = require("./health.routes");
const authRoutes = require("./auth.routes");
const deviceAuthRoutes = require("./deviceAuth.routes");
const locationRoutes = require("./location.routes");
const tuktukRoutes = require("./tuktuk.routes");

const router = express.Router();

router.use(healthRoutes);
router.use(authRoutes);
router.use(deviceAuthRoutes);
router.use(locationRoutes);
router.use(tuktukRoutes);

module.exports = router;
