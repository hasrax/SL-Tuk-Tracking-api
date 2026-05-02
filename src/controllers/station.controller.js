const { StatusCodes } = require("http-status-codes");
const Station = require("../models/station.model");

async function create(req, res, next) {
  try {
    const { code, name, district } = req.body;
    const item = await Station.create({ code, name, district });
    return res.status(StatusCodes.CREATED).json(item);
  } catch (err) {
    next(err);
  }
}

async function list(req, res, next) {
  try {
    const filter = {};
    if (req.query.district) filter.district = req.query.district;

    const items = await Station.find(filter)
      .populate("district")
      .sort({ name: 1 })
      .lean();
    return res.status(StatusCodes.OK).json({ count: items.length, items });
  } catch (err) {
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    const item = await Station.findById(req.params.id).populate("district").lean();
    if (!item) return res.status(StatusCodes.NOT_FOUND).json({ message: "Station not found" });
    return res.status(StatusCodes.OK).json(item);
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const { code, name, district } = req.body;
    const item = await Station.findByIdAndUpdate(
      req.params.id,
      { code, name, district },
      { new: true }
    ).lean();
    if (!item) return res.status(StatusCodes.NOT_FOUND).json({ message: "Station not found" });
    return res.status(StatusCodes.OK).json(item);
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const item = await Station.findByIdAndDelete(req.params.id).lean();
    if (!item) return res.status(StatusCodes.NOT_FOUND).json({ message: "Station not found" });
    return res.status(StatusCodes.OK).json({ message: "Station deleted" });
  } catch (err) {
    next(err);
  }
}

module.exports = { create, list, getById, update, remove };