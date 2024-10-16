const express = require("express");
const router = express.Router();
const {countAirports } = require("../models/Airports");


router.get('/count', async (req, res) => {
    try {
        const count = await countAirports();
        res.json(count);
    } catch (err) {
        console.error('Error counting airports:', err);
        res.status(500).json({ error: "Failed to fetch airports." });
    }
});


router.post('/', async (req, res) => {
    const { Airport_ID, Airport_Name, City, Country } = req.body;

    if (!Airport_ID || !Airport_Name || !City || !Country) {
        return res.status(400).json({ error: "All fields are required." });
    }

    try {
        await insertAirport(Airport_ID, Airport_Name, City, Country);
        res.json({ message: "Airport created successfully!" });
    } catch (error) {
        console.error('Error creating airport:', error);
        res.status(500).json({ error: "Failed to create airport." });
    }
}
);


module.exports = router;