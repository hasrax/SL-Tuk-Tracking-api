const express = require("express");
const { body } = require("express-validator");

const { login, me } = require("../controllers/officerAuth.controller");
const { requireAuth } = require("../middleware/auth");
const { validate } = require("../middleware/validate");

const router = express.Router();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Officer login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 6
 *     responses:
 *       200:
 *         description: Login success
 *       400:
 *         description: Validation error
 */

router.post(
  "/auth/login",
  [body("email").isEmail(), body("password").isString().isLength({ min: 6 }), validate],
  login
);


router.get("/auth/me", requireAuth, me);

module.exports = router;