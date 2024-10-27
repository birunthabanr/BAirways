const connection = require('../database/connection');
// const { get } = require('../routes/FlightSchedules');

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
      console.log('Flight_ID:', Flight_ID);
      const deleteScheduleQuery = 'call DeleteFLight(?)';
      connection.query(deleteScheduleQuery, [Flight_ID], (err, result) => {
        if (err) {
          reject('Error deleting schedule: ' + err.stack);
        } else {
          console.log(`Schedule with Flight_ID ${Flight_ID} deleted successfully.`);
          resolve(result[0]);
        }
      });
    });
  };
  
  const updateSchedule = (scheduleData) => {
    return new Promise((resolve, reject) => {
      // const { Aircraft_ID, Departure_date_time, Expected_arrival_date_time, Flight_price, Modified_by } = scheduleData;
      // const Aircraft_ID = scheduleData.Aircraft_ID;
      // const Departure_date_time = scheduleData.Departure_date_time;
      // const Expected_arrival_date_time = scheduleData.Expected_arrival_date_time;
      // const Flight_price = scheduleData.Flight_price;
      // const Modified_by = scheduleData.Modified_by;
      const updateScheduleQuery = `
             call UpdateFlightSchedule(?,?,?,?,?,?,?,now())
      `;
      connection.query(
        updateScheduleQuery, 
        [scheduleData.Flight_ID,scheduleData.Route_ID,scheduleData.Aircraft_ID,scheduleData.Departure_date_time,scheduleData.Expected_arrival_date_time,scheduleData.Flight_price,scheduleData.Modified_by], // Use Flight_ID here
        (err, result) => {
          if (err) {
            reject('Error updating schedule: ' + err.stack);
          } else {
            console.log(`Schedule with Flight_ID ${scheduleData.Flight_ID} updated successfully.`);
            resolve(result);
          }
        }
      );
    });
  };
  
  const getAllFlightSchedules = () => {
    return new Promise((resolve, reject) => {
      const getFlightSchedulesQuery = `
            call GetAllFlightDetails()
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
  
          resolve(result[0]);
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


  const getScheduleById = (Flight_ID) => {
    return new Promise((resolve, reject) => {
      const getScheduleByIdQuery = `
        call GetAllFlightDetailsById(?)
      `;
      connection.query(getScheduleByIdQuery, [Flight_ID], (err, result) => {
        if (err) {
          reject('Error fetching schedule: ' + err.stack);
        } else {
          console.log('Schedule fetched successfully.');
          resolve(result[0][0]);
        }
      });
    });}


   const GetFLightDetailsByAirports = (Departure_airport, Arrival_airport) => {
    return new Promise((resolve, reject) => {
      const getScheduleByIdQuery = `
        call GetFlightdetailsByairports(?,?)
      `;
      connection.query(getScheduleByIdQuery, [Departure_airport, Arrival_airport], (err, result) => {
        if (err) {
          reject('Error fetching schedule: ' + err.stack);
        } else {
          console.log('Schedule by airport fetched successfully.');
          resolve(result[0]);
        }
      });
    });}
    
    
    const TakeFlightbyID = (Flight_ID) => {
      return new Promise((resolve, reject) => {
        const getScheduleByIdQuery = `
          call SelectAllFlightSchedules(?)`;
        connection.query(getScheduleByIdQuery, [Flight_ID], (err, result) => {
          if (err) {
            reject('Error fetching schedule: ' + err.stack);
          } else {
            console.log('Schedule fetched successfully.');
            resolve(result[0][0]);
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
    getScheduleById,
    GetFLightDetailsByAirports,
    TakeFlightbyID

  };
