const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: "localhost",
    user: 'admin',      // Database user
    password: '1234@Work',  // Database password
    database: 'airlinedb'
});

// Connect to the database
connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err.stack);
      return;
    }
    console.log('Connected to the database.');
  });

  module.exports = connection;