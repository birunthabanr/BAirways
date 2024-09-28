const connection = require('../database/connection');

// Function to initialize the Airport table
const aircraftsQuery = () => {
  return new Promise((resolve, reject) => {
    const createAircraftTableQuery = `
      CREATE TABLE IF NOT EXISTS Aircrafts (
        Aircraft_ID INT AUTO_INCREMENT PRIMARY KEY,
        Model_ID INT,
        FOREIGN KEY (Model_ID) REFERENCES Models(Model_ID)
      );
    `;
    connection.query(createAircraftTableQuery, (err, results) => {
      if (err) {
        reject('Error creating Aircrafts table: ' + err.stack);
      } else {
        console.log('Aircrafts table is ready.');
        resolve();
      }
    });
  });
};

const insertAircraft = () => {
  return new Promise((resolve, reject) => {
    const insertAircraftQuery = `
      INSERT INTO Aircrafts (Model_ID)
      VALUES (1);
    `;
    connection.query(insertAircraftQuery, (err, results) => {
      if (err) {
        reject('Error inserting aircraft: ' + err.stack);
      } else {
        console.log('Aircraft inserted successfully.');
        resolve(results.insertId);
      }
    });
  });
}

const fetchAircraftById = (aircraftId) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT model_id FROM aircrafts WHERE Aircraft_ID = ?';
    connection.query(query, [aircraftId], (err, results) => {
      if (err) {
        reject('Error fetching aircraft: ' + err.stack);
      } else if (results.length === 0) {
        reject('Aircraft not found');
      } else {
        resolve(results[0].model_id); // return the model_id from the result
      }
    });
  });
};



module.exports = { aircraftsQuery, insertAircraft, fetchAircraftById };
