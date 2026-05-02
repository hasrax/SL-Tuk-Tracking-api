/**
 * @swagger
 * /api/devices:
 *   post:
 *     summary: Create device
 *     tags: [Device]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [deviceId, tuktuk, secret]
 *             properties:
 *               deviceId: { type: string }
 *               tuktuk: { type: string }
 *               secret: { type: string }
 *     responses:
 *       201: { description: Created }
 */

/**
 * @swagger
 * /api/devices:
 *   get:
 *     summary: List devices
 *     tags: [Device]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: OK }
 */

/**
 * @swagger
 * /api/devices/{id}:
 *   get:
 *     summary: Get device by ID
 *     tags: [Device]
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
 * /api/devices/{id}:
 *   put:
 *     summary: Update device
 *     tags: [Device]
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
 *               deviceId: { type: string }
 *               tuktuk: { type: string }
 *               isActive: { type: boolean }
 *     responses:
 *       200: { description: OK }
 */

/**
 * @swagger
 * /api/devices/{id}:
 *   delete:
 *     summary: Delete device
 *     tags: [Device]
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
const { body, param } = require("express-validator");
const { create, list, getById, update, remove } = require("../controllers/device.controller");
const { validate } = require("../middleware/validate");
const { requireAuth, requireRole } = require("../middleware/auth");

const router = express.Router();

router.post(
  "/devices",
  [
    requireAuth,
    requireRole("HQ_ADMIN"),
    body("deviceId").isString().notEmpty(),
    body("tuktuk").isMongoId(),
    body("secret").isString().isLength({ min: 6 }),
    validate
  ],
  create
);

router.get("/devices", requireAuth, list);

router.get("/devices/:id", [requireAuth, param("id").isMongoId(), validate], getById);

router.put(
  "/devices/:id",
  [
    requireAuth,
    requireRole("HQ_ADMIN"),
    param("id").isMongoId(),
    body("deviceId").optional().isString(),
    body("tuktuk").optional().isMongoId(),
    body("isActive").optional().isBoolean(),
    validate
  ],
  update
);

router.delete(
  "/devices/:id",
  [requireAuth, requireRole("HQ_ADMIN"), param("id").isMongoId(), validate],
  remove
);

module.exports = router;