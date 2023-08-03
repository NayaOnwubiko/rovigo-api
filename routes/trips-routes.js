const express = require("express");
const router = express.Router();
const tripsController = require("../controllers/tripsController");
const authorize = require("../middleware/authorize");

router.route("/").get(authorize, tripsController.getAllTrips);

router
  .route("/:id")
  .get(tripsController.getSingleTrip)
  .post(tripsController.addToTrip);

router.route("/create").post(tripsController.createTrip);

module.exports = router;
