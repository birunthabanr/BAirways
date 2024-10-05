const express = require('express');
const router =express.Router();
const {insertAircraft, fetchAircraftById } = require("../models/Aircrafts");
const {fetchSeatConfiguration} = require("../models/AircraftsModels");
// const connection = require('../database/connection');

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

router.get('/:id', async (req, res) => {
    const aircraftId = req.params.id;
        
    try {
        // Fetch the model_id for the given aircraft
        const modelId = await fetchAircraftById(aircraftId);
        
        // Fetch the seat configuration for the given model_id
        const seatConfiguration = await fetchSeatConfiguration(modelId);
        
        // Log the seatConfiguration for debugging
        console.log("Seat Configuration:", seatConfiguration);

        // Check if seatConfiguration is an array and has at least one entry
        if (seatConfiguration && seatConfiguration.length > 0) {
            res.json({
                economySeats: seatConfiguration[0].EconomyClassSeatCount,
                businessSeats: seatConfiguration[0].BusinessClassSeatCount,
                platinumSeats: seatConfiguration[0].PlatinumClassSeatcount
            });
        } else {
            // Handle case where seat configuration is empty or undefined
            res.status(404).json({ error: 'Seat configuration not found' });
        }
        
    } catch (error) {
        console.error("Error fetching seat configuration: ", error);
        res.status(500).send({ error: error.message });
    }
});


module.exports = router;