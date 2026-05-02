/**
 * @swagger
 * /api/stations:
 *   post:
 *     summary: Create station
 *     tags: [Station]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [code, name, district]
 *             properties:
 *               code: { type: string }
 *               name: { type: string }
 *               district: { type: string }
 *     responses:
 *       201: { description: Created }
 */

/**
 * @swagger
 * /api/stations:
 *   get:
 *     summary: List stations
 *     tags: [Station]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: query
 *         name: district
 *         schema: { type: string }
 *     responses:
 *       200: { description: OK }
 */

/**
 * @swagger
 * /api/stations/{id}:
 *   get:
 *     summary: Get station by ID
 *     tags: [Station]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: OK }
 */

/**
 * @swagger
 * /api/stations/{id}:
 *   put:
 *     summary: Update station
 *     tags: [Station]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code: { type: string }
 *               name: { type: string }
 *               district: { type: string }
 *     responses:
 *       200: { description: OK }
 */

/**
 * @swagger
 * /api/stations/{id}:
 *   delete:
 *     summary: Delete station
 *     tags: [Station]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Deleted }
 */

const express = require("express");
const { body, param, query } = require("express-validator");
const { create, list, getById, update, remove } = require("../controllers/station.controller");
const { validate } = require("../middleware/validate");
const { requireAuth, requireRole } = require("../middleware/auth");

const router = express.Router();

router.post(
  "/stations",
  [
    requireAuth,
    requireRole("HQ_ADMIN"),
    body("code").isString().notEmpty(),
    body("name").isString().notEmpty(),
    body("district").isMongoId(),
    validate
  ],
  create
);

router.get("/stations", [requireAuth, query("district").optional().isMongoId(), validate], list);

router.get("/stations/:id", [requireAuth, param("id").isMongoId(), validate], getById);

router.put(
  "/stations/:id",
  [
    requireAuth,
    requireRole("HQ_ADMIN"),
    param("id").isMongoId(),
    body("code").optional().isString(),
    body("name").optional().isString(),
    body("district").optional().isMongoId(),
    validate
  ],
  update
);

router.delete(
  "/stations/:id",
  [requireAuth, requireRole("HQ_ADMIN"), param("id").isMongoId(), validate],
  remove
);

module.exports = router;