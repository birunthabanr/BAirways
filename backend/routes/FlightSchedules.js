const express = require("express");
const router = express.Router();
const {addSchedule, getAllFlightSchedules, updateSchedule} = require("../models/FlightSchedules");

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

router.get("/:id", async (req, res) => {
  try {
    const schedule = await getAllFlightSchedules();
    res.json(schedule);
  } catch (err) {
    console.error(err);
    res.send("Error fetching schedule");
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


  router.put("/:id", async (req, res) => { 
    try {
      const id = req.params.id;  // Get the id from request parameters
      const scheduleData = req.body; // Get the whole body as scheduleData
      await updateSchedule(id, scheduleData); // Pass id and scheduleData
      res.send("Schedule updated successfully.");
    } catch (error) {
      console.error("Error updating schedule:", error);
      res.status(500).send("Error updating schedule: " + error.message);
    }
  });
  

module.exports = router;