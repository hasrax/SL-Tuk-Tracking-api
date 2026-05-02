const express = require("express");
const { body } = require("express-validator");
const { login } = require("../controllers/deviceAuth.controller");
const { validate } = require("../middleware/validate");

const router = express.Router();

/**
 * @swagger
 * /api/devices/auth/login:
 *   post:
 *     summary: Device login
 *     tags: [Device Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [deviceId, deviceSecret]
 *             properties:
 *               deviceId:
 *                 type: string
 *               deviceSecret:
 *                 type: string
 *                 minLength: 6
 *     responses:
 *       200:
 *         description: Login success
 *       400:
 *         description: Validation error
 */

router.post(
  "/devices/auth/login",
  [
    body("deviceId").isString().notEmpty(),
    body("deviceSecret").isString().isLength({ min: 6 }),
    validate
  ],
  login
);

module.exports = router;