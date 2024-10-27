const express = require("express");
const router = express.Router();
const { searchFlights } = require("../models/FlightSchedules");

router.post("/", async (req, res) => {
  const { departureAirport, arrivalAirport, leavingDate, returnDate } = req.body;

  try {
    const flights = await searchFlights(departureAirport, arrivalAirport, leavingDate, returnDate);
    res.json(flights);
  } catch (error) {
    console.error("Error searching flights:", error);
    res.status(500).json({ error: "Failed to search flights." });
  }
});

module.exports = router;
