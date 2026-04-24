const jwt = require("jsonwebtoken");
const env = require("../config/env");

function signJwt(payload, options = {}) {
  if (!env.jwtSecret) throw new Error("JWT_SECRET missing in env");
  return jwt.sign(payload, env.jwtSecret, { expiresIn: env.jwtExpiresIn, ...options });
}

function verifyJwt(token) {
  if (!env.jwtSecret) throw new Error("JWT_SECRET missing in env");
  return jwt.verify(token, env.jwtSecret);
}

module.exports = { signJwt, verifyJwt };