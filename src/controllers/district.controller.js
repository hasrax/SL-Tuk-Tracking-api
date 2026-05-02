const { StatusCodes } = require("http-status-codes");
const District = require("../models/district.model");

async function create(req, res, next) {
  try {
    const { code, name, province } = req.body;
    const item = await District.create({ code, name, province });
    return res.status(StatusCodes.CREATED).json(item);
  } catch (err) {
    next(err);
  }
}

async function list(req, res, next) {
  try {
    const filter = {};
    if (req.query.province) filter.province = req.query.province;

    const items = await District.find(filter)
      .populate("province")
      .sort({ name: 1 })
      .lean();
    return res.status(StatusCodes.OK).json({ count: items.length, items });
  } catch (err) {
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    const item = await District.findById(req.params.id).populate("province").lean();
    if (!item) return res.status(StatusCodes.NOT_FOUND).json({ message: "District not found" });
    return res.status(StatusCodes.OK).json(item);
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const { code, name, province } = req.body;
    const item = await District.findByIdAndUpdate(
      req.params.id,
      { code, name, province },
      { new: true }
    ).lean();
    if (!item) return res.status(StatusCodes.NOT_FOUND).json({ message: "District not found" });
    return res.status(StatusCodes.OK).json(item);
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const item = await District.findByIdAndDelete(req.params.id).lean();
    if (!item) return res.status(StatusCodes.NOT_FOUND).json({ message: "District not found" });
    return res.status(StatusCodes.OK).json({ message: "District deleted" });
  } catch (err) {
    next(err);
  }
}

module.exports = { create, list, getById, update, remove };