const { StatusCodes } = require("http-status-codes");
const Device = require("../models/device.model");
const { hashPassword } = require("../utils/password");

async function create(req, res, next) {
  try {
    const { deviceId, tuktuk, secret } = req.body;
    const item = await Device.create({
      deviceId,
      tuktuk,
      secretHash: await hashPassword(secret),
      isActive: true
    });
    return res.status(StatusCodes.CREATED).json(item);
  } catch (err) {
    next(err);
  }
}

async function list(req, res, next) {
  try {
    const items = await Device.find().populate("tuktuk").lean();
    return res.status(StatusCodes.OK).json({ count: items.length, items });
  } catch (err) {
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    const item = await Device.findById(req.params.id).populate("tuktuk").lean();
    if (!item) return res.status(StatusCodes.NOT_FOUND).json({ message: "Device not found" });
    return res.status(StatusCodes.OK).json(item);
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const { deviceId, tuktuk, isActive } = req.body;
    const item = await Device.findByIdAndUpdate(
      req.params.id,
      { deviceId, tuktuk, isActive },
      { new: true }
    ).lean();
    if (!item) return res.status(StatusCodes.NOT_FOUND).json({ message: "Device not found" });
    return res.status(StatusCodes.OK).json(item);
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const item = await Device.findByIdAndDelete(req.params.id).lean();
    if (!item) return res.status(StatusCodes.NOT_FOUND).json({ message: "Device not found" });
    return res.status(StatusCodes.OK).json({ message: "Device deleted" });
  } catch (err) {
    next(err);
  }
}

module.exports = { create, list, getById, update, remove };