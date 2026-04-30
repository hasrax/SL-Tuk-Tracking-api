const { StatusCodes } = require("http-status-codes");
const LocationPing = require("../models/locationPing.model");
const Device = require("../models/device.model");
const TukTuk = require("../models/tuktuk.model");

async function ping(req, res, next) {
  try {
    const { lat, lng, pingedAt } = req.body;

    const deviceId = req.auth.sub;
    const device = await Device.findById(deviceId);
    if (!device) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid device" });
    }

    const tuktukId = device.tuktuk;

    const record = await LocationPing.create({
      tuktuk: tuktukId,
      device: device._id,
      lat,
      lng,
      pingedAt: pingedAt ? new Date(pingedAt) : new Date()
    });

    await Device.updateOne({ _id: device._id }, { $set: { lastSeenAt: new Date() } });

    return res.status(StatusCodes.CREATED).json({
      message: "Ping stored",
      id: record._id
    });
  } catch (err) {
    next(err);
  }
}

async function lastLocation(req, res, next) {
  try {
    const { id } = req.params;

    const exists = await TukTuk.exists({ _id: id });
    if (!exists) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "TukTuk not found" });
    }

    const last = await LocationPing.findOne({ tuktuk: id }).sort({ pingedAt: -1 }).lean();

    return res.status(StatusCodes.OK).json({ lastLocation: last || null });
  } catch (err) {
    next(err);
  }
}

async function history(req, res, next) {
  try {
    const { id } = req.params;
    const { from, to } = req.query;

    const exists = await TukTuk.exists({ _id: id });
    if (!exists) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "TukTuk not found" });
    }

    const filter = { tuktuk: id };
    if (from || to) {
      filter.pingedAt = {};
      if (from) filter.pingedAt.$gte = new Date(from);
      if (to) filter.pingedAt.$lte = new Date(to);
    }

    const items = await LocationPing.find(filter)
      .sort({ pingedAt: -1 })
      .limit(500)
      .lean();

    return res.status(StatusCodes.OK).json({ count: items.length, items });
  } catch (err) {
    next(err);
  }
}

module.exports = { ping, lastLocation, history };