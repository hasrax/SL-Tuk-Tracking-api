const express = require("express");
const { query, param } = require("express-validator");
const { list, getById } = require("../controllers/tuktuk.controller");
const { validate } = require("../middleware/validate");

const router = express.Router();

router.get(
  "/tuktuks",
  [
    query("province").optional().isMongoId(),
    query("district").optional().isMongoId(),
    query("station").optional().isMongoId(),
    query("isActive").optional().isBoolean(),
    validate
  ],
  list
);

router.get(
  "/tuktuks/:id",
  [param("id").isMongoId(), validate],
  getById
);

module.exports = router;