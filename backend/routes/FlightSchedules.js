const express = require("express");
const router = express.Router();
const {addSchedule, getAllFlightSchedules} = require("../models/FlightSchedules");

router.post("/", async (req, res) => {
    const { Aircraft_ID, Departure_date_time, Expected_arrival_date_time, Flight_price, Created_By } = req.body;

    try {
        await addSchedule(Aircraft_ID, Departure_date_time, Expected_arrival_date_time, Flight_price, Created_By, Created_By);
        res.json({ message: "Flight schedule created successfully!" });
    } catch (err) {
        console.error("Error creating flight schedule:", err);
        res.json({ error: "Failed to create flight schedule." });
    }
});

router.get("/", async (req, res) => {
    try {
      const schedule = await getAllFlightSchedules();
      res.json(schedule);
    } catch (err) {
      console.error(err);
      res.send("Error fetching schedule");
    }
  });

module.exports = router;