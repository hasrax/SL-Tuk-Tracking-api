// src/models/district.model.js
const mongoose = require("mongoose");

const districtSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true, uppercase: true },
    name: { type: String, required: true },
    province: { type: mongoose.Schema.Types.ObjectId, ref: "Province", required: true }
  },
  { timestamps: true }
);

districtSchema.index({ province: 1, name: 1 }, { unique: true });

module.exports = mongoose.model("District", districtSchema);