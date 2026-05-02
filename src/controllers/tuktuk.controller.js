const { StatusCodes } = require("http-status-codes");
const TukTuk = require("../models/tuktuk.model");

async function create(req, res, next) {
  try {
    const { regNo, displayName, province, district, station, isActive } = req.body;
    const item = await TukTuk.create({ regNo, displayName, province, district, station, isActive });
    return res.status(StatusCodes.CREATED).json(item);
  } catch (err) {
    next(err);
  }
}

async function list(req, res, next) {
  try {
    const { province, district, station, isActive } = req.query;
    const filter = {};
    if (province) filter.province = province;
    if (district) filter.district = district;
    if (station) filter.station = station;
    if (isActive !== undefined) filter.isActive = isActive === "true";

    const items = await TukTuk.find(filter)
      .populate("province district station")
      .sort({ regNo: 1 })
      .lean();

    return res.status(StatusCodes.OK).json({ count: items.length, items });
  } catch (err) {
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    const item = await TukTuk.findById(req.params.id)
      .populate("province district station")
      .lean();

    if (!item) return res.status(StatusCodes.NOT_FOUND).json({ message: "TukTuk not found" });
    return res.status(StatusCodes.OK).json(item);
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const { regNo, displayName, province, district, station, isActive } = req.body;
    const item = await TukTuk.findByIdAndUpdate(
      req.params.id,
      { regNo, displayName, province, district, station, isActive },
      { new: true }
    ).lean();

    if (!item) return res.status(StatusCodes.NOT_FOUND).json({ message: "TukTuk not found" });
    return res.status(StatusCodes.OK).json(item);
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const item = await TukTuk.findByIdAndDelete(req.params.id).lean();
    if (!item) return res.status(StatusCodes.NOT_FOUND).json({ message: "TukTuk not found" });
    return res.status(StatusCodes.OK).json({ message: "TukTuk deleted" });
  } catch (err) {
    next(err);
  }
}

module.exports = { create, list, getById, update, remove };