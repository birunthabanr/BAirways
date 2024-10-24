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


const countAirports = ()=>{
  return new Promise((resolve, reject) => {
    const query = `
       call GetTotalAirportCount();
    `;
    connection.query(query, (err, results) => {
      if (err) {
        reject('Error counting users:', err.stack);
      } else {
        // resolve(results[0].total);
        resolve(results[0][0].total);
      }
    });
  });
}


const fetchAllAirports = ()=> {
  return new Promise((resolve,reject)=>{
    const query = `call GetAllAirports()`;
    connection.query(query,(err,results)=>{
      if(err){
        reject('Error fetching airports:',err.stack);
      }else{
        resolve(results[0]);
      }
    });
  })
}

module.exports = { airportsQuery,countAirports,fetchAllAirports };
