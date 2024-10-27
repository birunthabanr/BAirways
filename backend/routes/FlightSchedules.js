const express = require("express");
const router = express.Router();
const {addSchedule, getAllFlightSchedules, updateSchedule,deleteSchedule,countFlightSchedules,getScheduleById,GetFLightDetailsByAirports,TakeFlightbyID} = require("../models/FlightSchedules");

router.post("/", async (req, res) => {
    const { Aircraft_ID, Route_ID,Departure_date_time, Expected_arrival_date_time, Flight_price, Created_By } = req.body;
    // console.log(Aircraft_ID, Route_ID,Departure_date_time, Expected_arrival_date_time, Flight_price, Created_By);

    try {
        await addSchedule(Aircraft_ID, Route_ID,Departure_date_time, Expected_arrival_date_time, Flight_price, Created_By);
        res.json({ message: "Flight schedule created successfully!" });
    } catch (err) {
        console.error("Error creating flight schedule:", err);
        res.json({ error: "Failed to create flight schedule." });
    }
});

// router.get("/:id", async (req, res) => {
//   try {
//     const schedule = await getAllFlightSchedules();
//     res.json(schedule);
//   } catch (err) {
//     console.error(err);
//     res.send("Error fetching schedule");
//   }
// });

router.get("/", async (req, res) => {
    try {
      const schedule = await getAllFlightSchedules();
      res.json(schedule);
    } catch (err) {
      console.error(err);
      res.send("Error fetching schedule");
    }
  });


  router.put("/update", async (req, res) => { 
    try {  // Get the id from request parameters
      const scheduleData = req.body; // Get the whole body as scheduleData
      await updateSchedule(scheduleData); // Pass id and scheduleData
      res.send("Schedule updated successfully.");
    } catch (error) {
      console.error("Error updating schedule:", error);
      res.status(500).send("Error updating schedule: " + error.message);
    }
  });


  router.delete("/delete", async (req, res) => {   //modified
    try {
      const id = req.query.id;
      console.log(id);
      await deleteSchedule(id);
      res.send("Schedule deleted successfully.");
    } catch (error) {
      console.error("Error deleting schedule:", error);
      res.status(500).send("Error deleting schedule: " + error.message);
    }
  });
  
  router.get('/count', async (req, res) => {
    try {
        const count = await countFlightSchedules();
        res.json(count);
    } catch (error) {
        console.error("Error counting users:", error);
        res.status(500).json({ error: "Failed to count users." });
    }
} );

router.get("/byID", async (req, res) => {
  try {
    const id = req.query.id;
    const schedule = await getScheduleById(id);
    res.json(schedule);
  } catch (err) {
    console.error(err);
    res.send("Error fetching schedule");
  }
});

router.get("/byAirports", async (req, res) => {
  try {
    const {from,to} = req.query;
    const schedule = await GetFLightDetailsByAirports(from,to);
    res.json(schedule);
  } catch (err) {
    console.error(err);
    res.send("Error fetching schedule");
  }
});

router.get("/modify/id", async (req, res) => {
  try {
    const id = req.query.id;
    const schedule = await TakeFlightbyID(id);
    res.json(schedule);
  } catch (err) {
    console.error(err);
    res.send("Error fetching schedule");
  }
});



module.exports = router;