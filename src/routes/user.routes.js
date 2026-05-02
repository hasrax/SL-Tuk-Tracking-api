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