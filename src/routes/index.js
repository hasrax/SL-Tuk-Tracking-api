const express = require("express");
const healthRoutes = require("./health.routes");
const authRoutes = require("./auth.routes");
const deviceAuthRoutes = require("./deviceAuth.routes");
const locationRoutes = require("./location.routes");
const tuktukRoutes = require("./tuktuk.routes");
const swaggerRoutes = require("./swagger.routes");

const provinceRoutes = require("./province.routes");
const districtRoutes = require("./district.routes");
const stationRoutes = require("./station.routes");
const deviceRoutes = require("./device.routes");
const userRoutes = require("./user.routes");

const router = express.Router();

router.use(healthRoutes);
router.use(authRoutes);
router.use(deviceAuthRoutes);
router.use(locationRoutes);
router.use(tuktukRoutes);
router.use(swaggerRoutes);
router.use(provinceRoutes);
router.use(districtRoutes);
router.use(stationRoutes);
router.use(deviceRoutes);
router.use(userRoutes);

module.exports = router;
