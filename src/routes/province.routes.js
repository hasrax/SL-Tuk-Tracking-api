/**
 * @swagger
 * /api/provinces:
 *   post:
 *     summary: Create province
 *     tags: [Province]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [code, name]
 *             properties:
 *               code: { type: string }
 *               name: { type: string }
 *     responses:
 *       201: { description: Created }
 */
 
/**
 * @swagger
 * /api/provinces:
 *   get:
 *     summary: List provinces
 *     tags: [Province]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: OK }
 */

/**
 * @swagger
 * /api/provinces/{id}:
 *   get:
 *     summary: Get province by ID
 *     tags: [Province]
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
 * /api/provinces/{id}:
 *   put:
 *     summary: Update province
 *     tags: [Province]
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
 *     responses:
 *       200: { description: OK }
 */

/**
 * @swagger
 * /api/provinces/{id}:
 *   delete:
 *     summary: Delete province
 *     tags: [Province]
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
const { create, list, getById, update, remove } = require("../controllers/province.controller");
const { validate } = require("../middleware/validate");
const { requireAuth, requireRole } = require("../middleware/auth");

const router = express.Router();

router.post(
  "/provinces",
  [requireAuth, requireRole("HQ_ADMIN"), body("code").isString().notEmpty(), body("name").isString().notEmpty(), validate],
  create
);

router.get("/provinces", requireAuth, list);

router.get("/provinces/:id", [requireAuth, param("id").isMongoId(), validate], getById);

router.put(
  "/provinces/:id",
  [requireAuth, requireRole("HQ_ADMIN"), param("id").isMongoId(), body("code").optional().isString(), body("name").optional().isString(), validate],
  update
);

router.delete(
  "/provinces/:id",
  [requireAuth, requireRole("HQ_ADMIN"), param("id").isMongoId(), validate],
  remove
);

module.exports = router;