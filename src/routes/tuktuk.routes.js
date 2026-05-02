/**
 * @swagger
 * /api/tuktuks:
 *   post:
 *     summary: Create tuktuk
 *     tags: [TukTuk]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [regNo, displayName, province, district, station]
 *             properties:
 *               regNo: { type: string }
 *               displayName: { type: string }
 *               province: { type: string }
 *               district: { type: string }
 *               station: { type: string }
 *               isActive: { type: boolean }
 *     responses:
 *       201: { description: Created }
 */

/**
 * @swagger
 * /api/tuktuks:
 *   get:
 *     summary: List tuktuks
 *     tags: [TukTuk]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: query
 *         name: province
 *         schema: { type: string }
 *       - in: query
 *         name: district
 *         schema: { type: string }
 *       - in: query
 *         name: station
 *         schema: { type: string }
 *       - in: query
 *         name: isActive
 *         schema: { type: boolean }
 *     responses:
 *       200: { description: OK }
 */

/**
 * @swagger
 * /api/tuktuks/{id}:
 *   get:
 *     summary: Get tuktuk by ID
 *     tags: [TukTuk]
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
 * /api/tuktuks/{id}:
 *   put:
 *     summary: Update tuktuk
 *     tags: [TukTuk]
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
 *               regNo: { type: string }
 *               displayName: { type: string }
 *               province: { type: string }
 *               district: { type: string }
 *               station: { type: string }
 *               isActive: { type: boolean }
 *     responses:
 *       200: { description: OK }
 */

/**
 * @swagger
 * /api/tuktuks/{id}:
 *   delete:
 *     summary: Delete tuktuk
 *     tags: [TukTuk]
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
const { body, query, param } = require("express-validator");
const { create, list, getById, update, remove } = require("../controllers/tuktuk.controller");
const { validate } = require("../middleware/validate");
const { requireAuth, requireRole } = require("../middleware/auth");

const router = express.Router();

router.post(
  "/tuktuks",
  [
    requireAuth,
    requireRole("HQ_ADMIN"),
    body("regNo").isString().notEmpty(),
    body("displayName").isString().notEmpty(),
    body("province").isMongoId(),
    body("district").isMongoId(),
    body("station").isMongoId(),
    body("isActive").optional().isBoolean(),
    validate
  ],
  create
);

router.get(
  "/tuktuks",
  [
    requireAuth,
    query("province").optional().isMongoId(),
    query("district").optional().isMongoId(),
    query("station").optional().isMongoId(),
    query("isActive").optional().isBoolean(),
    validate
  ],
  list
);

router.get("/tuktuks/:id", [requireAuth, param("id").isMongoId(), validate], getById);

router.put(
  "/tuktuks/:id",
  [
    requireAuth,
    requireRole("HQ_ADMIN"),
    param("id").isMongoId(),
    body("regNo").optional().isString(),
    body("displayName").optional().isString(),
    body("province").optional().isMongoId(),
    body("district").optional().isMongoId(),
    body("station").optional().isMongoId(),
    body("isActive").optional().isBoolean(),
    validate
  ],
  update
);

router.delete(
  "/tuktuks/:id",
  [requireAuth, requireRole("HQ_ADMIN"), param("id").isMongoId(), validate],
  remove
);

module.exports = router;