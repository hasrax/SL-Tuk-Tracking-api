const express = require("express");
const { body } = require("express-validator");

const { login, me } = require("../controllers/officerAuth.controller");
const { requireAuth } = require("../middleware/auth");
const { validate } = require("../middleware/validate");

const router = express.Router();

router.post(
  "/auth/login",
  [body("email").isEmail(), body("password").isString().isLength({ min: 6 }), validate],
  login
);

router.get("/auth/me", requireAuth, me);

module.exports = router;