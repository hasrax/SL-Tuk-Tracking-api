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