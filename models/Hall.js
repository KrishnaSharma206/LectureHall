const mongoose = require("mongoose");

const hallSchema = new mongoose.Schema({
  name: { type: String, required: true },
  capacity: { type: Number, required: true },
  location: { type: String, required: true },
  facilities: [String],
  isAvailable: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model("Hall", hallSchema);