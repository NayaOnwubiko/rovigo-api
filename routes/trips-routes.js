const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/tripsController');
const authorize = require('../middleware/authorize');

router
    .route('/')
    .get(authorize, tripsController.getAllTrips);

router
    .route('/create')
    .post(authorize, tripsController.createTrip);

module.exports = router;