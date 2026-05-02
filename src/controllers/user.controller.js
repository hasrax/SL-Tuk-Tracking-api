const { StatusCodes } = require("http-status-codes");
const User = require("../models/user.model");
const { hashPassword } = require("../utils/password");

async function create(req, res, next) {
  try {
    const { fullName, email, password, role, province, district, station } = req.body;
    const item = await User.create({
      fullName,
      email,
      passwordHash: await hashPassword(password),
      role,
      province,
      district,
      station,
      isActive: true
    });
    return res.status(StatusCodes.CREATED).json(item);
  } catch (err) {
    next(err);
  }
}

async function list(req, res, next) {
  try {
    const items = await User.find().lean();
    return res.status(StatusCodes.OK).json({ count: items.length, items });
  } catch (err) {
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    const item = await User.findById(req.params.id).lean();
    if (!item) return res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" });
    return res.status(StatusCodes.OK).json(item);
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const { fullName, role, province, district, station, isActive } = req.body;
    const item = await User.findByIdAndUpdate(
      req.params.id,
      { fullName, role, province, district, station, isActive },
      { new: true }
    ).lean();
    if (!item) return res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" });
    return res.status(StatusCodes.OK).json(item);
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const item = await User.findByIdAndDelete(req.params.id).lean();
    if (!item) return res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" });
    return res.status(StatusCodes.OK).json({ message: "User deleted" });
  } catch (err) {
    next(err);
  }
}

module.exports = { create, list, getById, update, remove };