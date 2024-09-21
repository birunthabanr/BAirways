const express = require('express');
const router =express.Router();
const {insertAircraft} = require("../models/Aircrafts");

router.post('/', async (req, res) => {
    const { modelId} =req.body;

    try {
        await insertAircraft(modelId);
        res.json({message:"Craft created successfully"});
    } catch (err) {
        console.error("Error creating aircraft: ", error);
        res.json({error: err.message});
    }
});

module.exports = router;