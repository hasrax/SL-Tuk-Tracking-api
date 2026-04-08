// src/models/province.model.js
const mongoose = require("mongoose");

const provinceSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true, uppercase: true },
    name: { type: String, required: true, unique: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Province", provinceSchema);