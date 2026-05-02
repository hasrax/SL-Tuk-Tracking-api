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