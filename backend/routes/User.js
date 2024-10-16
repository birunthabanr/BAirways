const express = require("express");
const router = express.Router();
const {insertUser, getUserByEmail,countUsers} = require('../models/Users');
const {insertRegistered, getRegisteredByUsername} = require('../models/RegisteredUsers');
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
// const { validateToken } = require("../middleware/AuthMiddleware");


router.post("/signup", async (req, res) => {
    const { firstName, secondName, username, email, password, country, dob, address,
        city, gender, phone } = req.body;


    if (!password) {
        return res.json({ error: "Password is required." });
    }

    try {

        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.json({ error: "Email already in use." });
        }
        const existingRegistered = await getRegisteredByUsername(username);
        if (existingRegistered) {
            return res.json({ error: "Username is required." });
        }

        const userID = await insertUser(firstName, secondName, country, dob, address, city, email, gender, phone, 0);

        const hash = await bcrypt.hash(password, 10);

        const newUser = await getUserByEmail(email); // Or however you fetch the newly created user
        if (!newUser) {
            return res.json({ error: "Failed to retrieve user after registration." });
        }
        const User_ID = newUser.User_ID;

        console.log('Inserted User_ID:', User_ID);

        await insertRegistered(username, hash, User_ID);

        res.json({ message: "User created successfully!" });
    } catch (error) {
        console.error('Error creating user:', error);
        res.json({ error: "Failed to create user." });
    }
});

// router.post("/login", async (req, res) => {
//     const { username, password } = req.body;

//     if (!username || !password) {
//         return res.status(400).json({ error: "Username and password are required." });
//     }

//     try {
//         const user = await getUserByUsername(username);

//         if (!user) {
//             return res.status(400).json({ error: "Invalid username." });
//         }

//         const match = await bcrypt.compare(password, user.password);

//         if (!match) {
//             return res.status(400).json({ error: "Invalid password." });
//         }

//         const accessToken = sign(
//             { username: user.username, id: user.id },
//             "importantsecret"
//         );

//         res.json({ accessToken });
//     } catch (error) {
//         console.error("Error logging in user:", error);
//         res.status(500).json({ error: "Failed to log in user." });
//     }
// });


router.get("/count", async (req, res) => {
    try {
        const count = await countUsers();
        res.json(count);
    } catch (error) {
        console.error("Error counting users:", error);
        res.status(500).json({ error: "Failed to count users." });
    }
}); 




module.exports = router;