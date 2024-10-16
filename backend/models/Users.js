const connection = require('../database/connection');

// Function to initialize the database (e.g., create tables if they don't exist)
const usersQuery = () => {
  return new Promise((resolve, reject) => {
    const createUsersTableQuery = `
      CREATE TABLE IF NOT EXISTS Users (
        User_ID INT AUTO_INCREMENT PRIMARY KEY,
        FirstName VARCHAR(50) NOT NULL,
        SecondName VARCHAR(50) NOT NULL,
        Country VARCHAR(255) NOT NULL,
        DOB DATETIME NOT NULL,
        Address VARCHAR(100) NOT NULL,
        City VARCHAR(50) NOT NULL,
        Email VARCHAR(50) NOT NULL UNIQUE,
        Gender VARCHAR(10) NOT NULL,
        Phone_number VARCHAR(20) NOT NULL,
        Num_Of_Users INT NOT NULL
      );
    `;

    // createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    //     updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    connection.query(createUsersTableQuery, (err, results) => {
      if (err) {
        reject('Error creating Users table:', err.stack);
      } else {
        console.log('Users table is ready.');
        resolve();
      }
    });
  });
};

// Function to insert a user
const insertUser = (firstName, secondName, country, dob, address, city, email, gender, phoneNumber, numOfUsers) => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO Users (FirstName, SecondName, Country, DOB, Address, City, Email, Gender, Phone_number, Num_Of_Users)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;
    connection.query(query, [firstName, secondName, country, dob, address, city, email, gender, phoneNumber, numOfUsers], (err, results) => {
      if (err) {
        reject('Error inserting user:', err.stack);
      } else {
        console.log('User inserted successfully.');
        resolve(results);
      }
    });
  });
};

// Function to get a user by Email (updated to fetch by Email instead of Username)
const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT * FROM Users WHERE Email = ?;
    `;
    connection.query(query, [email], (err, results) => {
      if (err) {
        reject('Error fetching user:', err.stack);
      } else {
        resolve(results[0] || null); // Return the first user or null if no user is found
      }
    });
  });
};

// Function to update a user by ID
const updateUserById = (id, updates) => {
  const { firstName, secondName, country, dob, address, city, email, gender, phoneNumber, numOfUsers } = updates;
  return new Promise((resolve, reject) => {
    const query = `
      UPDATE Users
      SET FirstName = ?, SecondName = ?, Country = ?, DOB = ?, Address = ?, City = ?, Email = ?, Gender = ?, Phone_number = ?, Num_Of_Users = ?
      WHERE User_ID = ?;
    `;
    connection.query(query, [firstName, secondName, country, dob, address, city, email, gender, phoneNumber, numOfUsers, id], (err, results) => {
      if (err) {
        reject('Error updating user:', err.stack);
      } else {
        console.log('User updated successfully.');
        resolve(results);
      }
    });
  });
};

// Function to delete a user by ID
const deleteUserById = (id) => {
  return new Promise((resolve, reject) => {
    const query = `
      DELETE FROM Users WHERE User_ID = ?;
    `;
    connection.query(query, [id], (err, results) => {
      if (err) {
        reject('Error deleting user:', err.stack);
      } else {
        console.log('User deleted successfully.');
        resolve(results);
      }
    });
  });
};

const countUsers = () => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT COUNT(*) AS total FROM Users;
    `;
    connection.query(query, (err, results) => {
      if (err) {
        reject('Error counting users:', err.stack);
      } else {
        resolve(results[0].total);
      }
    });
  });
}

module.exports = { usersQuery, insertUser, getUserByEmail, updateUserById, deleteUserById,countUsers };