const { StatusCodes } = require("http-status-codes");
const TukTuk = require("../models/tuktuk.model");

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
    const { id } = req.params;

    const tuktuk = await TukTuk.findById(id)
      .populate("province district station")
      .lean();

    if (!tuktuk) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "TukTuk not found" });
    }

    return res.status(StatusCodes.OK).json(tuktuk);
  } catch (err) {
    next(err);
  }
}

module.exports = { list, getById };