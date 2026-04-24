const mongoose = require("mongoose");

const locationPingSchema = new mongoose.Schema(
  {
    tuktuk: { type: mongoose.Schema.Types.ObjectId, ref: "TukTuk", required: true },
    device: { type: mongoose.Schema.Types.ObjectId, ref: "Device", required: true },

    lat: { type: Number, required: true, min: -90, max: 90 },
    lng: { type: Number, required: true, min: -180, max: 180 },


    speedKph: { type: Number, min: 0 },
    heading: { type: Number, min: 0, max: 359 },

    pingedAt: { type: Date, required: true }
  },
  { timestamps: true }
);


locationPingSchema.index({ tuktuk: 1, pingedAt: -1 });
locationPingSchema.index({ device: 1, pingedAt: -1 });

module.exports = mongoose.model("LocationPing", locationPingSchema);