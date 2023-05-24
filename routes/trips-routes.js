const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/tripsController');

router
    .route('/')
    .get(tripsController.getAllTrips)
    .post(tripsController.createTrip);

module.exports = router;