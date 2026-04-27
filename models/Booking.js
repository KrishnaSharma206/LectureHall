const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  hall: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hall",
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  startDateTime: { type: Date, required: true },
  endDateTime: { type: Date, required: true },

  purpose: String,

  status: {
    type: String,
    enum: ["pending", "approved", "cancelled"],
    default: "pending"
  },
  recurrence: {
    type: {
      type: String,
      enum: ["none", "daily", "weekly"],
      default: "none"
    },
    interval: { type: Number, default: 1 }, // every X days/weeks
    daysOfWeek: [Number], // 0=Sun ... 6=Sat (for weekly)
    endDate: Date // when recurrence stops
  },
  seriesId: {
    type: mongoose.Schema.Types.ObjectId,
    default: null
  }

}, { timestamps: true });
bookingSchema.index({ hall: 1, startDateTime: 1, endDateTime: 1 });

module.exports = mongoose.model("Booking", bookingSchema);