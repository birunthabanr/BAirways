const express = require("express");
const router = express.Router();
const { createBooking } = require("../models/Reservation");

router.post("/", async (req, res) => {
  const { passengerInfo, flightID, classType } = req.body;

  try {
    const bookingID = await createBooking(passengerInfo, flightID, classType);
    res.json({ message: "Booking successful", bookingID });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ error: "Failed to create booking." });
  }
});

module.exports = router;
