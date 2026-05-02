const express = require("express");
const { body, param, query } = require("express-validator");
const { create, list, getById, update, remove } = require("../controllers/station.controller");
const { validate } = require("../middleware/validate");
const { requireAuth, requireRole } = require("../middleware/auth");

const router = express.Router();

router.post(
  "/stations",
  [
    requireAuth,
    requireRole("HQ_ADMIN"),
    body("code").isString().notEmpty(),
    body("name").isString().notEmpty(),
    body("district").isMongoId(),
    validate
  ],
  create
);

router.get("/stations", [requireAuth, query("district").optional().isMongoId(), validate], list);

router.get("/stations/:id", [requireAuth, param("id").isMongoId(), validate], getById);

router.put(
  "/stations/:id",
  [
    requireAuth,
    requireRole("HQ_ADMIN"),
    param("id").isMongoId(),
    body("code").optional().isString(),
    body("name").optional().isString(),
    body("district").optional().isMongoId(),
    validate
  ],
  update
);

router.delete(
  "/stations/:id",
  [requireAuth, requireRole("HQ_ADMIN"), param("id").isMongoId(), validate],
  remove
);

module.exports = router;