/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create officer
 *     tags: [User]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [fullName, email, password, role]
 *             properties:
 *               fullName: { type: string }
 *               email: { type: string }
 *               password: { type: string }
 *               role: { type: string }
 *               province: { type: string }
 *               district: { type: string }
 *               station: { type: string }
 *     responses:
 *       201: { description: Created }
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: List officers
 *     tags: [User]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: OK }
 */

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get officer by ID
 *     tags: [User]
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
 * /api/users/{id}:
 *   put:
 *     summary: Update officer
 *     tags: [User]
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
 *               fullName: { type: string }
 *               role: { type: string }
 *               province: { type: string }
 *               district: { type: string }
 *               station: { type: string }
 *               isActive: { type: boolean }
 *     responses:
 *       200: { description: OK }
 */

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete officer
 *     tags: [User]
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
const { create, list, getById, update, remove } = require("../controllers/user.controller");
const { validate } = require("../middleware/validate");
const { requireAuth, requireRole } = require("../middleware/auth");
const { USER_ROLES } = require("../models/user.model");

const router = express.Router();

router.post(
  "/users",
  [
    requireAuth,
    requireRole("HQ_ADMIN"),
    body("fullName").isString().notEmpty(),
    body("email").isEmail(),
    body("password").isString().isLength({ min: 6 }),
    body("role").isIn(USER_ROLES),
    body("province").optional().isMongoId(),
    body("district").optional().isMongoId(),
    body("station").optional().isMongoId(),
    validate
  ],
  create
);

router.get("/users", [requireAuth, requireRole("HQ_ADMIN")], list);

router.get("/users/:id", [requireAuth, requireRole("HQ_ADMIN"), param("id").isMongoId(), validate], getById);

router.put(
  "/users/:id",
  [
    requireAuth,
    requireRole("HQ_ADMIN"),
    param("id").isMongoId(),
    body("fullName").optional().isString(),
    body("role").optional().isIn(USER_ROLES),
    body("province").optional().isMongoId(),
    body("district").optional().isMongoId(),
    body("station").optional().isMongoId(),
    body("isActive").optional().isBoolean(),
    validate
  ],
  update
);

router.delete(
  "/users/:id",
  [requireAuth, requireRole("HQ_ADMIN"), param("id").isMongoId(), validate],
  remove
);

module.exports = router;