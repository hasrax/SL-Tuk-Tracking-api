const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema(
  {
    deviceId: { type: String, required: true, trim: true, unique: true }, 
    tuktuk: { type: mongoose.Schema.Types.ObjectId, ref: "TukTuk", required: true },


    isActive: { type: Boolean, default: true },
    lastSeenAt: { type: Date },
    secretHash: { type: String, required: true }
  },
  { timestamps: true }
);

deviceSchema.index({ tuktuk: 1 });
module.exports = mongoose.model("Device", deviceSchema);