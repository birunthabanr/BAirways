const connection = require('../database/connection');

// Function to initialize the Airport table
const ScheduleQuery = () => {
  return new Promise((resolve, reject) => {
    const createScheduleTableQuery = `
      CREATE TABLE IF NOT EXISTS FlightSchedules (
        Flight_ID INT AUTO_INCREMENT PRIMARY KEY,
        Aircraft_ID INT NOT NULL,
        Departure_date_time DateTime NOT NULL,
        Expected_arrival_date_time DateTime NOT NULL,
        Flight_price float NOT NULL,
        Created_By VARCHAR(20) NOT NULL,
        Created_time DateTime NOT NULL,
        Modified_by VARCHAR(20) NOT NULL,
        Modified_time DateTime NOT NULL,
        FOREIGN KEY (Aircraft_ID) REFERENCES Aircrafts(Aircraft_ID)
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
const addSchedule = (Aircraft_ID, Departure_date_time, Expected_arrival_date_time, Flight_price, Created_By) => {
    return new Promise((resolve, reject) => {
      const addScheduleQuery = `
        INSERT INTO FlightSchedules (Aircraft_ID, Departure_date_time, Expected_arrival_date_time, Flight_price, Created_By, Created_time, Modified_by, Modified_time) 
        VALUES (?, ?, ?, ?, ?, NOW(), ?, NOW());
      `;
      connection.query(
        addScheduleQuery, 
        [Aircraft_ID, Departure_date_time, Expected_arrival_date_time, Flight_price, Created_By, Created_By], 
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
      const deleteScheduleQuery = 'DELETE FROM Airport WHERE Flight_ID = ?';
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
  
  // Function to update a schedule
  const updateSchedule = (Flight_ID, scheduleData) => {
    return new Promise((resolve, reject) => {
      const { Aircraft_ID, Departure_date_time, Expected_arrival_date_time, Flight_price, Modified_by } = scheduleData;
      const updateScheduleQuery = `
        UPDATE Airport 
        SET Aircraft_ID = ?, Departure_date_time = ?, Expected_arrival_date_time = ?, Flight_price = ?, Modified_by = ?, Modified_time = NOW() 
        WHERE Flight_ID = ?
      `;
      connection.query(
        updateScheduleQuery, 
        [Aircraft_ID, Departure_date_time, Expected_arrival_date_time, Flight_price, Modified_by, Flight_ID], 
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
      const getFlightSchedulesQuery = 'SELECT * FROM FlightSchedules';
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
  

  module.exports = {
    ScheduleQuery,
    addSchedule,
    deleteSchedule,
    updateSchedule, 
    getAllFlightSchedules
  };
