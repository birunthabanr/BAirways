const express = require("express");
const router = express.Router();
const {
  addSchedule,
  getAllFlightSchedules,
  updateSchedule,
  deleteSchedule,
  countFlightSchedules,
  fetchAircraftById,
  getScheduleById,
  GetFLightDetailsByAirports,
  TakeFlightbyID,
  searchFlights,
} = require("../models/FlightSchedules");
const connection = require("../database/connection");

router.post("/", async (req, res) => {
  const {
    Aircraft_ID,
    Route_ID,
    Departure_date_time,
    Expected_arrival_date_time,
    Flight_price,
    Created_By,
  } = req.body;
  // console.log(Aircraft_ID, Route_ID,Departure_date_time, Expected_arrival_date_time, Flight_price, Created_By);

  try {
    await addSchedule(
      Aircraft_ID,
      Route_ID,
      Departure_date_time,
      Expected_arrival_date_time,
      Flight_price,
      Created_By
    );
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
  try {
    // Get the id from request parameters
    const scheduleData = req.body; // Get the whole body as scheduleData
    await updateSchedule(scheduleData); // Pass id and scheduleData
    res.send("Schedule updated successfully.");
  } catch (error) {
    console.error("Error updating schedule:", error);
    res.status(500).send("Error updating schedule: " + error.message);
  }
});

router.delete("/delete", async (req, res) => {
  //modified
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

router.get("/count", async (req, res) => {
  try {
    const count = await countFlightSchedules();
    res.json(count);
  } catch (error) {
    console.error("Error counting users:", error);
    res.status(500).json({ error: "Failed to count users." });
  }
});

router.get("/:FLight_ID", (req, res) => {
  const { FLight_ID } = req.params;

  fetchAircraftById(FLight_ID)
    .then((seatCounts) => {
      res.json(seatCounts);
    })
    .catch((error) => {
      if (error === "Aircraft not found") {
        res.status(404).json({ message: error });
      } else {
        res.status(500).json({ message: error });
      }
    });
});

router.get("/booking/:FLight_ID", async (req, res) => {
  const id = req.params.FLight_ID;

  connection.query(
    `SELECT 
      p.Price AS Price, 
      CAST(am.EconomyClassSeatCount / 10 AS SIGNED) AS EconomyRows, 
      CAST(am.BusinessClassSeatCount / 10 AS SIGNED) AS BusinessRows, 
      CAST(am.PlatinumClassSeatCount / 10 AS SIGNED) AS PlatinumRows 
    FROM FlightSchedule AS fs 
    JOIN Aircraft AS a ON fs.Aircraft_ID = a.Aircraft_ID 
    JOIN Aircraft_model AS am ON a.Model_ID = am.Model_ID 
    JOIN SeatPrices AS p ON fs.FLight_ID = p.FLight_ID 
    WHERE fs.FLight_ID = ?;`,
    [id],
    function (err, result, fields) {
      if (err) {
        console.log(err);
        return res.status(500).send({ error: "Database query error" });
      }
      if (result.length === 0) {
        return res.status(404).send({ message: "Flight not found" });
      }

      console.log(result); // Log the result for debugging
      res.send(result); // Send the response
    }
  );
});

router.post("/booked/:FLight_ID", async (req, res) => {
  const id = req.params.FLight_ID;
  const { i, j, selectedClass } = req.body;

  // Map "Gold" class to "Business" in the database
  const classType = selectedClass === "Gold" ? "Business" : selectedClass;

  // Query to check if the seat is already booked
  connection.query(
    `SELECT t.Flight_ID, s.Class_ID, s.Row_num, s.Col_num 
       FROM ticket AS t 
       JOIN seat AS s ON t.Seat_ID = s.Seat_ID 
       JOIN class AS c ON c.Class_ID = s.Class_ID 
       WHERE t.Flight_ID = ? AND c.ClassType = ? AND s.Row_num = ? AND s.Col_num = ?;`,
    [id, classType, i + 1, j + 1],
    function (err, result, fields) {
      if (err) {
        console.log(err);
        res.status(500).send("Database error");
      } else {
        // If no results, the seat is not booked
        if (result.length === 0) {
          console.log("not booked");
          res.send(false);
        } else {
          // If results are found, the seat is booked
          console.log("booked");
          res.send(true);
        }
      }
    }
  );
});

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
    const { from, to } = req.query;
    const schedule = await GetFLightDetailsByAirports(from, to);
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

router.post("/search", async (req, res) => {
  const { departure, destination, date } = req.body;

  try {
    const flights = await searchFlights(departure, destination, date);
    res.json(flights);
  } catch (error) {
    console.error("Error searching flights: ", error);
    res.status(500).json({ error: "Failed to search flights." });
  }
});

module.exports = router;
