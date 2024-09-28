const connection = require('../database/connection');

// Function to initialize the Airport table
const modelsQuery = () => {
  return new Promise((resolve, reject) => {
    const createModelsTableQuery = `
      CREATE TABLE IF NOT EXISTS Models (
        Model_ID INT AUTO_INCREMENT PRIMARY KEY,
        Model_name VARCHAR(10) NOT NULL UNIQUE,
        EconomyClassSeatCount INT,
        BusinessClassSeatCount INT,
        PlatinumClassSeatCount INT
      );
    `;
    connection.query(createModelsTableQuery, (err, results) => {
      if (err) {
        reject('Error creating Model table: ' + err.stack);
      } else {
        console.log('Model table is ready.');
        resolve();
      }
    });
  });
};

const insertModel = (modelname, Economy, Business, Platinum) => {
  return new Promise((resolve, reject) => {
    const insertModelQuery = `
      INSERT INTO Models (Model_name, EconomyClassSeatCount, BusinessClassSeatCount, PlatinumClassSeatCount)
      VALUES (?,?,?,?);
    `;
    connection.query(insertModelQuery, [modelname, Economy, Business, Platinum], (err, results) => {
      if (err) {
        reject('Error inserting model: ', err.stack);
      } else {
        console.log('Model inserted successfully.');
        resolve(results);
      }
    });
  });
}

const fetchSeatConfiguration = (modelId) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT EconomyClassSeatCount, BusinessClassSeatCount, PlatinumClassSeatCount FROM models WHERE Model_ID = ?';
    connection.query(query, [modelId], (err, results) => {
      if (err) {
        reject('Error fetching seat configuration: ' + err.stack);
      } else if (results.length === 0) {
        reject('Seat configuration not found');
      } else {
        resolve(results[0]); // return the seat configuration object
      }
    });
  });
};

module.exports = { modelsQuery, insertModel, fetchSeatConfiguration };
