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