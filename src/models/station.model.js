// src/models/station.model.js
const mongoose = require("mongoose");

const stationSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true, uppercase: true },
    name: { type: String, required: true },
    district: { type: mongoose.Schema.Types.ObjectId, ref: "District", required: true }
  },
  { timestamps: true }
);

stationSchema.index({ district: 1, name: 1 }, { unique: true });

module.exports = mongoose.model("Station", stationSchema);