const { StatusCodes } = require("http-status-codes");
const User = require("../models/user.model");
const { verifyPassword } = require("../utils/password");
const { signJwt } = require("../utils/jwt");

async function login(req, res, next) {
  try {
    const email = (req.body.email || "").toLowerCase().trim();
    const password = req.body.password || "";

    const user = await User.findOne({ email, isActive: true });
    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid credentials" });
    }

    const ok = await verifyPassword(password, user.passwordHash);
    if (!ok) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid credentials" });
    }

    const token = signJwt({
      sub: user._id.toString(),
      type: "OFFICER",
      role: user.role,
      province: user.province ? user.province.toString() : undefined,
      district: user.district ? user.district.toString() : undefined,
      station: user.station ? user.station.toString() : undefined
    });

    return res.status(StatusCodes.OK).json({
      token,
      tokenType: "Bearer"
    });
  } catch (err) {
    next(err);
  }
}

async function me(req, res) {

  return res.status(StatusCodes.OK).json({ auth: req.auth });
}

module.exports = { login, me };