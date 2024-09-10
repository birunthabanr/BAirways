const connection = require('../database/connection');

// Function to initialize the database (e.g., create tables if they don't exist)
const usersQuery = () => {
  return new Promise((resolve, reject) => {
    const createUsersTableQuery = `
      CREATE TABLE IF NOT EXISTS Users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        userClass ENUM('admin', 'moderator', 'user') NOT NULL
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

const insertUser = (username, email, password, userClass = 'user') => {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO Users (username, email, password, userClass)
        VALUES (?, ?, ?, ?);
      `;
      connection.query(query, [username, email, password, userClass], (err, results) => {
        if (err) {
          reject('Error inserting user:', err.stack);
        } else {
          console.log('User inserted successfully.');
          resolve(results);
        }
      });
    });
  };

const getUserByUsername = (username) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT * FROM Users WHERE username = ?;
      `;
      connection.query(query, [username], (err, results) => {
        if (err) {
          reject('Error fetching user:', err.stack);
        } else {
          resolve(results[0] || null); // Return the first user or null if no user is found
        }
      });
    });
  };

  const updateUserById = (id, updates) => {
    const { username, email, password, userClass } = updates;
    return new Promise((resolve, reject) => {
      const query = `
        UPDATE Users
        SET username = ?, email = ?, password = ?, userClass = ?
        WHERE id = ?;
      `;
      connection.query(query, [username, email, password, userClass, id], (err, results) => {
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
        DELETE FROM Users WHERE id = ?;
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

module.exports = {usersQuery, deleteUserById, insertUser, updateUserById, getUserByUsername};
