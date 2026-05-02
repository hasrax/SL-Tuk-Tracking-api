const express = require("express");
const { body, param } = require("express-validator");
const { create, list, getById, update, remove } = require("../controllers/province.controller");
const { validate } = require("../middleware/validate");
const { requireAuth, requireRole } = require("../middleware/auth");

const router = express.Router();

router.post(
  "/provinces",
  [requireAuth, requireRole("HQ_ADMIN"), body("code").isString().notEmpty(), body("name").isString().notEmpty(), validate],
  create
);

router.get("/provinces", requireAuth, list);

router.get("/provinces/:id", [requireAuth, param("id").isMongoId(), validate], getById);

router.put(
  "/provinces/:id",
  [requireAuth, requireRole("HQ_ADMIN"), param("id").isMongoId(), body("code").optional().isString(), body("name").optional().isString(), validate],
  update
);

router.delete(
  "/provinces/:id",
  [requireAuth, requireRole("HQ_ADMIN"), param("id").isMongoId(), validate],
  remove
);

module.exports = router;