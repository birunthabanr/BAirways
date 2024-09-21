const connection = require('../database/connection');

// Function to initialize the database
const adminsQuery = () => {
  return new Promise((resolve, reject) => {
    const createAdminsTableQuery = `
      CREATE TABLE IF NOT EXISTS Admins (
        Admin_ID INT AUTO_INCREMENT PRIMARY KEY,
        FirstName VARCHAR(50) NOT NULL,
        SecondName VARCHAR(50) NOT NULL,
        Username VARCHAR(255) NOT NULL UNIQUE,
        Password VARCHAR(255) NOT NULL,
        Country VARCHAR(255) NOT NULL,
        DOB DATETIME NOT NULL,
        Address VARCHAR(100) NOT NULL,
        City VARCHAR(50) NOT NULL,
        Email VARCHAR(50) NOT NULL UNIQUE,
        Gender VARCHAR(10) NOT NULL,
        Phone_number VARCHAR(20) NOT NULL
      );
    `;

    connection.query(createAdminsTableQuery, (err, results) => {
      if (err) {
        console.error('Detailed error:', err);
        reject('Error creating Admins table:', err.stack);
      } else {
        console.log('Admins table is ready.');
        resolve();
      }
    });
  });
};

// Function to insert a admin
const insertAdmin = (firstName, secondName, username, password, country, dob, address, city, email, gender, phoneNumber) => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO Admins (FirstName, SecondName, Username, Password, Country, DOB, Address, City, Email, Gender, Phone_number)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;
    connection.query(query, [firstName, secondName, username, password, country, dob, address, city, email, gender, phoneNumber], (err, results) => {
      if (err) {
        console.error('Detailed error:', err);
        reject('Error inserting admin:', err.stack);
      } else {
        console.log('Admin inserted successfully.');
        resolve(results);
      }
    });
  });
};

// Function to get a user by Email (updated to fetch by Email instead of Username)
const getAdminByUsername = (username) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT * FROM Admins WHERE Email = ?;
    `;
    connection.query(query, [username], (err, results) => {
      if (err) {
        reject('Error fetching admin:', err.stack);
      } else {
        resolve(results[0] || null); // Return the first user or null if no user is found
      }
    });
  });
};

module.exports = { adminsQuery, insertAdmin, getAdminByUsername};