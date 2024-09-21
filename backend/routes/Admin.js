const express = require("express");
// const { getAdminByUsername } = require("../models/Admins");
const router = express.Router();
const {insertAdmin, getAdminByUsername} = require("../models/Admins");
const bcrypt = require("bcrypt");
const {sign} = require("jsonwebtoken");

router.post("/adminlog", async (req, res) => {
    const { firstName, secondName, username, email, password, country, dob, address, city, gender, phone } = req.body;

    if (!password) {
        return res.json({ error: "Password is required." });
    }

    try {
        const existingUser = await getAdminByUsername(username);
        if (existingUser) {
            return res.json({ error: "Username already in use." });
        }

        const hash = await bcrypt.hash(password, 10);

        const AdminID = await insertAdmin(firstName, secondName, username, hash, country, dob, address, city, email, gender, phone);

    } catch (error) {
        console.error('Error creating admin:', error);
        res.json({ error: "Failed to create admin." });
    }
});

module.exports = router;