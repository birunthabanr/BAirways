const connection = require('../database/connection');

// Function to initialize the Airport table
const airportsQuery = () => {
  return new Promise((resolve, reject) => {
    const createAirportTableQuery = `
      CREATE TABLE IF NOT EXISTS Airport (
        Airport_ID INT AUTO_INCREMENT PRIMARY KEY,
        Short_code VARCHAR(10) NOT NULL UNIQUE,
        name VARCHAR(30) NOT NULL,
        Country VARCHAR(30) NOT NULL,
        State VARCHAR(30) NOT NULL,
        city VARCHAR(30) NOT NULL
      );
    `;
    connection.query(createAirportTableQuery, (err, results) => {
      if (err) {
        reject('Error creating Airport table: ' + err.stack);
      } else {
        console.log('Airport table is ready.');
        resolve();
      }
    });
  });
};

module.exports = { airportsQuery };
