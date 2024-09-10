const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const db = require("./models/Users");

const usersRouter = require("./routes/User");
app.use("/user", usersRouter);

// Initialize the database and then start the server
db.usersQuery().then(() => {
    // Once the database is initialized, start the server
    app.listen(5174, () => {
      console.log('Server is running on port 5174');
    });
  })
  .catch((error) => {
    // If the database initialization fails, log the error and don't start the server
    console.error('Failed to initialize the database:', error);
  });


// app.get('/', (req, res) => {
//     res.send('Hello, World!');
//   });
  