/**
 * @swagger
 * /api/districts:
 *   post:
 *     summary: Create district
 *     tags: [District]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [code, name, province]
 *             properties:
 *               code: { type: string }
 *               name: { type: string }
 *               province: { type: string }
 *     responses:
 *       201: { description: Created }
 */

/**
 * @swagger
 * /api/districts:
 *   get:
 *     summary: List districts
 *     tags: [District]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: query
 *         name: province ID
 *         schema: { type: string }
 *     responses:
 *       200: { description: OK }
 */

/**
 * @swagger
 * /api/districts/{id}:
 *   get:
 *     summary: Get district by ID
 *     tags: [District]
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
 * /api/districts/{id}:
 *   put:
 *     summary: Update district
 *     tags: [District]
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
 *               province: { type: string }
 *     responses:
 *       200: { description: OK }
 */

/**
 * @swagger
 * /api/districts/{id}:
 *   delete:
 *     summary: Delete district
 *     tags: [District]
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
const { create, list, getById, update, remove } = require("../controllers/district.controller");
const { validate } = require("../middleware/validate");
const { requireAuth, requireRole } = require("../middleware/auth");

const router = express.Router();

router.post(
  "/districts",
  [
    requireAuth,
    requireRole("HQ_ADMIN"),
    body("code").isString().notEmpty(),
    body("name").isString().notEmpty(),
    body("province").isMongoId(),
    validate
  ],
  create
);

router.get(
  "/districts",
  [requireAuth, query("province").optional().isMongoId(), validate],
  list
);

router.get("/districts/:id", [requireAuth, param("id").isMongoId(), validate], getById);

router.put(
  "/districts/:id",
  [
    requireAuth,
    requireRole("HQ_ADMIN"),
    param("id").isMongoId(),
    body("code").optional().isString(),
    body("name").optional().isString(),
    body("province").optional().isMongoId(),
    validate
  ],
  update
);

router.delete(
  "/districts/:id",
  [requireAuth, requireRole("HQ_ADMIN"), param("id").isMongoId(), validate],
  remove
);

module.exports = router;