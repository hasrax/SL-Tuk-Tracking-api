const express = require("express");
const { body, query, param } = require("express-validator");

const { ping, lastLocation, history } = require("../controllers/location.controller");
const { requireAuth, requireDevice } = require("../middleware/auth");
const { validate } = require("../middleware/validate");

const router = express.Router();

/**
 * @swagger
 * /api/locations/ping:
 *   post:
 *     summary: Send a location ping
 *     tags: [Location]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [lat, lng]
 *             properties:
 *               lat:
 *                 type: number
 *                 minimum: -90
 *                 maximum: 90
 *               lng:
 *                 type: number
 *                 minimum: -180
 *                 maximum: 180
 *               pingedAt:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Ping stored
 */

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

/**
 * @swagger
 * /api/tuktuks/{id}/last-location:
 *   get:
 *     summary: Get last known location
 *     tags: [Location]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Last location
 */

router.get(
  "/tuktuks/:id/last-location",
  [param("id").isMongoId(), validate],
  lastLocation
);

/**
 * @swagger
 * /api/tuktuks/{id}/history:
 *   get:
 *     summary: Get location history
 *     tags: [Location]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *           format: date-time
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *           format: date-time
 *     responses:
 *       200:
 *         description: Location history
 */

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