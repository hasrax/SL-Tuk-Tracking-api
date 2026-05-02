const express = require("express");

const router = express.Router();

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Health check
 *     description: Returns API uptime status and current server time.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 time:
 *                   type: string
 *                   example: 2026-05-02T04:32:14.962Z
 */

router.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    time: new Date().toISOString()
  });
});

module.exports = router;
