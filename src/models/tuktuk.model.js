const mongoose = require("mongoose");

const tuktukSchema = new mongoose.Schema(
  {
    regNo: { type: String, required: true, trim: true, uppercase: true, unique: true },
    displayName: { type: String, required: true, trim: true },

    province: { type: mongoose.Schema.Types.ObjectId, ref: "Province", required: true },
    district: { type: mongoose.Schema.Types.ObjectId, ref: "District", required: true },

    
    station: { type: mongoose.Schema.Types.ObjectId, ref: "Station", required: true },

    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

tuktukSchema.index({ province: 1, district: 1, station: 1 });
module.exports = mongoose.model("TukTuk", tuktukSchema);