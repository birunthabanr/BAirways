const express = require('express');
const router = express.Router();
const {insertModel} = require('../models/AircraftsModels');


router.post('/', async (req, res) => {
    const { modelname, Economy, Business, Platinum } = req.body;

    if (!modelname || !Economy || !Business || !Platinum) {
        return res.json({ error: "All fields are required." });
    }

    try {
        await insertModel(modelname, Economy, Business, Platinum);
        res.json({ message: "Model created successfully!" });
    } catch (err) {
        console.error('Error creating model:', err);
        res.status(500).json({ error: "Failed to create model." });
    }
});

module.exports = router;