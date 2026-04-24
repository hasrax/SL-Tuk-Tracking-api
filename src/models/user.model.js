const mongoose = require("mongoose");

const USER_ROLES = ["HQ_ADMIN", "PROVINCIAL_ADMIN", "STATION_OFFICER"];

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true, unique: true },
    passwordHash: { type: String, required: true },

    role: { type: String, required: true, enum: USER_ROLES },

    //optional
    province: { type: mongoose.Schema.Types.ObjectId, ref: "Province" },
    district: { type: mongoose.Schema.Types.ObjectId, ref: "District" },
    station: { type: mongoose.Schema.Types.ObjectId, ref: "Station" },

    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
module.exports.USER_ROLES = USER_ROLES;