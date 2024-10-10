// routes/Route.js
const express = require('express');
const router = express.Router();
const {  insertRoute, fetchAllRoutes } = require('../models/Route');

// Example route to get all routes
router.get('/', (req, res) => {
       try {
        const routes = fetchAllRoutes();
        res.json(routes);
    } catch (error) {
        console.error('Error fetching routes:', error);
        res.status(500).json({ error: "Failed to fetch routes." });
    }
    });

// Example route to add a route
router.post('/', (req, res) => {
    const { Route_ID, Arrival_Airport_ID, Departure_Airport_ID, Distance } = req.body;
    try {
        insertRoute(Route_ID, Arrival_Airport_ID, Departure_Airport_ID, Distance);
        res.json({ message: "Route created successfully!" });
    } catch (error) {  
        console.error('Error creating route:', error);
        res.status(500).json({ error: "Failed to create route." });
    }
    
});

module.exports = router;
