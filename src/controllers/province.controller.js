const { StatusCodes } = require("http-status-codes");
const Province = require("../models/province.model");

async function create(req, res, next) {
  try {
    const { code, name } = req.body;
    const item = await Province.create({ code, name });
    return res.status(StatusCodes.CREATED).json(item);
  } catch (err) {
    next(err);
  }
}

async function list(req, res, next) {
  try {
    const items = await Province.find().sort({ name: 1 }).lean();
    return res.status(StatusCodes.OK).json({ count: items.length, items });
  } catch (err) {
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    const item = await Province.findById(req.params.id).lean();
    if (!item) return res.status(StatusCodes.NOT_FOUND).json({ message: "Province not found" });
    return res.status(StatusCodes.OK).json(item);
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const { code, name } = req.body;
    const item = await Province.findByIdAndUpdate(
      req.params.id,
      { code, name },
      { new: true }
    ).lean();
    if (!item) return res.status(StatusCodes.NOT_FOUND).json({ message: "Province not found" });
    return res.status(StatusCodes.OK).json(item);
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const item = await Province.findByIdAndDelete(req.params.id).lean();
    if (!item) return res.status(StatusCodes.NOT_FOUND).json({ message: "Province not found" });
    return res.status(StatusCodes.OK).json({ message: "Province deleted" });
  } catch (err) {
    next(err);
  }
}

module.exports = { create, list, getById, update, remove };