const express = require("express");
const { query, param } = require("express-validator");
const { list, getById } = require("../controllers/tuktuk.controller");
const { validate } = require("../middleware/validate");

const router = express.Router();

/**
 * @swagger
 * /api/tuktuks:
 *   get:
 *     summary: List tuktuks
 *     tags: [TukTuk]
 *     parameters:
 *       - in: query
 *         name: province
 *         schema:
 *           type: string
 *       - in: query
 *         name: district
 *         schema:
 *           type: string
 *       - in: query
 *         name: station
 *         schema:
 *           type: string
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: List of tuktuks
 */
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


/**
 * @swagger
 * /api/tuktuks/{id}:
 *   get:
 *     summary: Get tuktuk by ID
 *     tags: [TukTuk]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: TukTuk details
 */
router.get(
  "/tuktuks/:id",
  [param("id").isMongoId(), validate],
  getById
);

module.exports = router;