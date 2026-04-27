const { StatusCodes } = require("http-status-codes");
const Device = require("../models/device.model");
const { verifyPassword } = require("../utils/password");
const { signJwt } = require("../utils/jwt");

async function login(req, res, next) {
  try {
    const { deviceId, deviceSecret } = req.body;

    const device = await Device.findOne({ deviceId, isActive: true });
    if (!device) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid device credentials" });
    }

    const ok = await verifyPassword(deviceSecret, device.secretHash);
    if (!ok) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid device credentials" });
    }

    await Device.updateOne({ _id: device._id }, { $set: { lastSeenAt: new Date() } });

    const token = signJwt({
      sub: device._id.toString(),
      role: "DEVICE",
      type: "DEVICE",
      tuktukId: device.tuktuk.toString()
    });

    return res.status(StatusCodes.OK).json({
      token,
      tokenType: "Bearer"
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { login };