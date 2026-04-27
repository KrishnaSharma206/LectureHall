const router = require("express").Router();
const Booking = require("../models/Booking");
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const generateRecurringDates = require("../utils/recurrence");
const mongoose = require("mongoose");
async function isHallAvailable(hallId, start, end) {
  const conflict = await Booking.findOne({
    hall: hallId,
    status: "approved",
    startDateTime: { $lt: new Date(end) },
    endDateTime: { $gt: new Date(start) }
  });

  return !conflict;
}
router.post("/", auth, role("faculty"), async (req, res) => {
  try {
    const {
      hall,
      startDateTime,
      endDateTime,
      recurrence
    } = req.body;

    if (new Date(startDateTime) >= new Date(endDateTime)) {
      return res.status(400).json({ msg: "Invalid time range" });
    }

    let bookingsToCreate = [];
    if (!recurrence || recurrence.type === "none") {
      const available = await isHallAvailable(hall, startDateTime, endDateTime);

      if (!available) {
        return res.status(400).json({ msg: "Hall not available" });
      }

      bookingsToCreate.push({
        ...req.body,
        user: req.user.id
      });
    }
    else {
      const dates = generateRecurringDates(
        startDateTime,
        endDateTime,
        recurrence
      );

      const duration =
        new Date(endDateTime) - new Date(startDateTime);

      const seriesId = new mongoose.Types.ObjectId();

      for (let date of dates) {
        const start = new Date(date);
        const end = new Date(start.getTime() + duration);

        const available = await isHallAvailable(hall, start, end);

        if (!available) {
          return res.status(400).json({
            msg: `Conflict on ${start.toISOString()}`
          });
        }

        bookingsToCreate.push({
          hall,
          user: req.user.id,
          startDateTime: start,
          endDateTime: end,
          purpose: req.body.purpose,
          recurrence,
          seriesId
        });
      }
    }

    const bookings = await Booking.insertMany(bookingsToCreate);

    res.json({
      msg: "Booking(s) created",
      count: bookings.length,
      bookings
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/", auth, async (req, res) => {
  const bookings = await Booking.find()
    .populate("hall")
    .populate("user", "name email");

  res.json(bookings);
});
router.put("/:id/approve", auth, role("admin"), async (req, res) => {
  const booking = await Booking.findByIdAndUpdate(
    req.params.id,
    { status: "approved" },
    { new: true }
  );

  res.json(booking);
});
router.put("/:id/cancel", auth, async (req, res) => {
  const booking = await Booking.findByIdAndUpdate(
    req.params.id,
    { status: "cancelled" },
    { new: true }
  );

  res.json(booking);
});

module.exports = router;