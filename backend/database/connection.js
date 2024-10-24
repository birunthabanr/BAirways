const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: "localhost",
    user: 'root',      // Database user
    password: '',  // Database password
    database: 'Bairways'
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