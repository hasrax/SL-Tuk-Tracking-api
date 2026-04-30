const express = require("express");
const { body, query, param } = require("express-validator");

const { ping, lastLocation, history } = require("../controllers/location.controller");
const { requireAuth, requireDevice } = require("../middleware/auth");
const { validate } = require("../middleware/validate");

const router = express.Router();

router.post(
  "/locations/ping",
  [
    requireAuth,
    requireDevice,
    body("lat").isFloat({ min: -90, max: 90 }),
    body("lng").isFloat({ min: -180, max: 180 }),
    body("pingedAt").optional().isISO8601(),
    validate
  ],
  ping
);

router.get(
  "/tuktuks/:id/last-location",
  [param("id").isMongoId(), validate],
  lastLocation
);

router.get(
  "/tuktuks/:id/history",
  [
    param("id").isMongoId(),
    query("from").optional().isISO8601(),
    query("to").optional().isISO8601(),
    validate
  ],
  history
);

module.exports = router;