const connection = require('../database/connection');

// Function to initialize the Airport table
const ScheduleQuery = () => {
  return new Promise((resolve, reject) => {
    // const createScheduleTableQuery = `
    //   CREATE TABLE IF NOT EXISTS FlightSchedules (
    //     Flight_ID INT AUTO_INCREMENT PRIMARY KEY,
    //     Aircraft_ID INT NOT NULL,
    //     Departure_date_time DateTime NOT NULL,
    //     Expected_arrival_date_time DateTime NOT NULL,
    //     Flight_price float NOT NULL,
    //     Created_By VARCHAR(20) NOT NULL,
    //     Created_time DateTime NOT NULL,
    //     Modified_by VARCHAR(20) NOT NULL,
    //     Modified_time DateTime NOT NULL,
    //     FOREIGN KEY (Aircraft_ID) REFERENCES Aircrafts(Aircraft_ID)
    //   );
    // `;


    const createScheduleTableQuery = `
         CREATE TABLE IF NOT EXISTS FlightSchedule (
            Flight_ID VARCHAR(7) PRIMARY KEY,
            Route_ID INT,
            Aircraft_ID INT,
            Departure_date_time DATETIME,
            Expected_arrival_date_time DATETIME,
            Flight_price FLOAT,
            Created_By VARCHAR(20),
            Created_time DATE,
            Modified_by VARCHAR(20) ,
            Modified_time DATETIME,
            FOREIGN KEY (Route_ID) REFERENCES Route(Route_ID),
            FOREIGN KEY (Aircraft_ID) REFERENCES Aircraft(Aircraft_ID),
            FOREIGN KEY (Created_By) REFERENCES Admin(Admin_ID),
            FOREIGN KEY (Modified_By) REFERENCES Admin(Admin_ID)
);
    `;

    connection.query(createScheduleTableQuery, (err, results) => {
      if (err) {
        reject('Error creating Schedule table: ' + err.stack);
      } else {
        console.log('Schedule table is ready.');
        resolve();
      }
    });
  });
};

// Function to add a new schedule
const addSchedule = (Aircraft_ID,Route_ID, Departure_date_time, Expected_arrival_date_time, Flight_price, Created_By) => {
  console.log(Aircraft_ID, Route_ID,Departure_date_time, Expected_arrival_date_time, Flight_price, Created_By);
    return new Promise((resolve, reject) => {
      // const addScheduleQuery = `
      //   INSERT INTO FlightSchedules (Aircraft_ID, Departure_date_time, Expected_arrival_date_time, Flight_price, Created_By, Created_time, Modified_by, Modified_time) 
      //   VALUES (?, ?, ?, ?, ?, NOW(), ?, NOW());
      // `;
      
      const addScheduleQuery = `call InsertFlight(?,?,?,?,?,?)`;
     

      connection.query(
        addScheduleQuery, 
        [Aircraft_ID, Route_ID,Departure_date_time, Expected_arrival_date_time, Flight_price, Created_By], 
        (err, result) => {
          if (err) {
            reject('Error adding schedule: ' + err.stack);
          } else {
            console.log('Schedule added successfully.');
            resolve(result);
          }
        }
      );
    });
  };
  
  // Function to delete a schedule by Flight_ID
  const deleteSchedule = (Flight_ID) => {
    return new Promise((resolve, reject) => {
      const deleteScheduleQuery = 'DELETE FROM flightschedules WHERE Flight_ID = ?';
      connection.query(deleteScheduleQuery, [Flight_ID], (err, result) => {
        if (err) {
          reject('Error deleting schedule: ' + err.stack);
        } else {
          console.log(`Schedule with Flight_ID ${Flight_ID} deleted successfully.`);
          resolve(result);
        }
      });
    });
  };
  
  const updateSchedule = (Flight_ID, scheduleData) => {
    return new Promise((resolve, reject) => {
      // const { Aircraft_ID, Departure_date_time, Expected_arrival_date_time, Flight_price, Modified_by } = scheduleData;
      // const Aircraft_ID = scheduleData.Aircraft_ID;
      // const Departure_date_time = scheduleData.Departure_date_time;
      // const Expected_arrival_date_time = scheduleData.Expected_arrival_date_time;
      // const Flight_price = scheduleData.Flight_price;
      // const Modified_by = scheduleData.Modified_by;

       

      const updateScheduleQuery = `
        UPDATE FlightSchedules 
        SET 
          Aircraft_ID = ?, 
          Flight_price = ?, 
          Departure_date_time = ?, 
          Expected_arrival_date_time = ?, 
          Modified_by = ?   
        WHERE Flight_ID = ?
      `;
  
      connection.query(
        updateScheduleQuery, 
        [Aircraft_ID, Flight_price, Departure_date_time, Expected_arrival_date_time, Modified_by, Flight_ID], // Use Flight_ID here
        (err, result) => {
          if (err) {
            reject('Error updating schedule: ' + err.stack);
          } else {
            console.log(`Schedule with Flight_ID ${Flight_ID} updated successfully.`);
            resolve(result);
          }
        }
      );
    });
  };
  
  const getAllFlightSchedules = () => {
    return new Promise((resolve, reject) => {
      const getFlightSchedulesQuery = `
            SELECT FLight_ID,am.Model_Name AS Aircraft,departure_ar.Name AS Departure_Airport,arrival_ar.Name AS Arrival_Airport,Departure_date_time,Expected_arrival_date_time,Flight_price, Created_BY,Created_time,Modified_BY,Modified_time
            FROM FlightSchedule f
            JOIN Aircraft a ON a.Aircraft_ID = f.Aircraft_ID
            JOIN Aircraft_model am ON a.Model_ID = am.Model_ID
            JOIN Route r ON r.Route_ID = f.Route_ID
            JOIN Airport departure_ar ON departure_ar.Airport_ID = r.Departure_Airport_ID
            JOIN Airport arrival_ar ON arrival_ar.Airport_ID = r.Arrival_Airport_ID;
      `;
      connection.query(getFlightSchedulesQuery, (err, result) => {
        if (err) {
          reject('Error retrieving flight schedules: ' + err.stack);
        } else {
          console.log('Flight schedules retrieved successfully.');
          console.log(result);
          if (result.length > 1) {
            console.log('More than one schedule retrieved.');
          } else {
            console.log('Only one schedule retrieved.');
          }
  
          resolve(result);
        }
      });
    });
  };


  const countFlightSchedules = () => {
    return new Promise((resolve, reject) => {
      const countFlightSchedulesQuery = 'call GetTotalFlightScheduleCount();';
      connection.query(countFlightSchedulesQuery, (err, result) => {
        if (err) {
          reject('Error counting flight schedules: ' + err.stack);
        } else {
          console.log('Flight schedules counted successfully.');
          console.log(result);
          resolve(result[0][0].total);
        }
      });
    });
  };

  const fetchAircraftById = (FLight_ID) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT EconomyClassSeatCount, BusinessClassSeatCount, PlatinumClassSeatCount FROM aircraftflightschedule WHERE FLight_ID = ?';
      connection.query(query, [FLight_ID], (err, results) => {
        if (err) {
          reject('Error fetching aircraft: ' + err.stack);
        } else if (results.length === 0) {
          reject('Aircraft not found');
        } else {
          resolve({
            EconomyClassSeatCount: results[0].EconomyClassSeatCount,
            BusinessClassSeatCount: results[0].BusinessClassSeatCount,
            PlatinumClassSeatCount: results[0].PlatinumClassSeatCount,
          }); // return the model_id from the result
        }
      });
    });
  }
  

  module.exports = {
    ScheduleQuery,
    addSchedule,
    deleteSchedule,
    updateSchedule, 
    getAllFlightSchedules,
    countFlightSchedules,
    fetchAircraftById
  };
