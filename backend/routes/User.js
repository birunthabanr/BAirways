const express = require("express");
const router = express.Router();
const {insertUser, getUserByUsername} = require('../models/Users');
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
// const { validateToken } = require("../middleware/AuthMiddleware");


router.post("/", async (req, res) => {
    const { username, email, password } = req.body;

    if (!password) {
        return res.status(400).json({ error: "Password is required." });
    }

    try {
        const hash = await bcrypt.hash(password, 10);

        await insertUser(username, email, hash);

        res.json({ message: "User created successfully!" });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: "Failed to create user." });
    }
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required." });
    }

    try {
        const user = await getUserByUsername(username);

        if (!user) {
            return res.status(400).json({ error: "Invalid username." });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(400).json({ error: "Invalid password." });
        }

        const accessToken = sign(
            { username: user.username, id: user.id },
            "importantsecret"
        );

        res.json({ accessToken });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ error: "Failed to log in user." });
    }
});



module.exports = router;