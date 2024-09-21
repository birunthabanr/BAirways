const connection = require('../database/connection');

// Function to initialize the Airport table
const rewardsQuery = () => {
  return new Promise((resolve, reject) => {
    const createRewardTableQuery = `
      CREATE TABLE IF NOT EXISTS Rewards (
        Reward_ID INT AUTO_INCREMENT PRIMARY KEY,
        Reward_class VARCHAR(30) NOT NULL,
        Discount FLOAT
      );
    `;
    connection.query(createRewardTableQuery, (err, results) => {
      if (err) {
        reject('Error creating Rewards table: ' + err.stack);
      } else {
        console.log('Rewards table is ready.');
        resolve();
      }
    });
  });
};

module.exports = { rewardsQuery };
