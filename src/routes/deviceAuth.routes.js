const express = require("express");
const { body } = require("express-validator");
const { login } = require("../controllers/deviceAuth.controller");
const { validate } = require("../middleware/validate");

const router = express.Router();

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