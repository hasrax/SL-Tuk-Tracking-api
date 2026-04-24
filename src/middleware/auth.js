const { StatusCodes } = require("http-status-codes");
const { verifyJwt } = require("../utils/jwt");

function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const [type, token] = header.split(" ");

    if (type !== "Bearer" || !token) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Missing Bearer token" });
    }

    const payload = verifyJwt(token);
    req.auth = payload;
    return next();
  } catch (err) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid or expired token" });
  }
}

function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.auth?.role) {
      return res.status(StatusCodes.FORBIDDEN).json({ message: "Missing role" });
    }
    if (!roles.includes(req.auth.role)) {
      return res.status(StatusCodes.FORBIDDEN).json({ message: "Insufficient permissions" });
    }
    next();
  };
}

function requireDevice(req, res, next) {
  if (req.auth?.role !== "DEVICE") {
    return res.status(StatusCodes.FORBIDDEN).json({ message: "Device token required" });
  }
  next();
}

module.exports = { requireAuth, requireRole, requireDevice };