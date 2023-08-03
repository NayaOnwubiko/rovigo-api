const knex = require("knex")(require("../knexfile"));
require("dotenv").config();

//configure the trips route to get data from the trips table that correspond to the user Id
exports.getAllTrips = async (req, res) => {
  await knex("trips")
    .where({ user_id: req.userId })
    .then((trips) => {
      if (trips.length === 0) {
        return res.status(404).json({
          message: "Unable to find trips",
        });
      }
      res.json(trips);
    })
    .catch((error) => {
      return res.status(400).json({
        message: "There was an issue with the request",
        error,
      });
    });
};

//Get a single trip by joining the hotel, attractions & restaurants
exports.getSingleTrip = async (req, res) => {
  await knex("trips AS t")
    .join("hotels AS h", "h.trip_id", "t.id")
    .select(
      "t.id",
      "t.trip_name",
      "h.listing_key",
      "h.hotel_name",
      "h.hotel_photo",
      "h.rating",
      "h.price"
    )
    .where({ "t.id": req.params.id })
    .then((trip) => {
      if (trip.length === 0) {
        return res.status(404).json({
          message: `Unable to find inventory with id: ${req.params.id}`,
        });
      }
      res.json(trip);
    });
};

//Adds destination results to a trip based on the ranking category (for hotels & restaurants) or rollup category for attractions
exports.addToTrip = (req, res) => {
  if (
    req.body.ranking_category === "restaurant" ||
    req.body.ranking_category === "bb" ||
    req.body.ranking_category === "other"
  ) {
    const {
      id,
      trip_id,
      restaurant_name,
      restaurant_address,
      restaurant_phone,
      restaurant_photo,
      restaurant_website,
      location_id,
      ranking_category,
    } = req.body;

    knex("restaurants")
      .insert({
        id,
        trip_id,
        restaurant_name,
        restaurant_address,
        restaurant_phone,
        restaurant_photo,
        restaurant_website,
        location_id,
        ranking_category,
      })
      .then((restaurants) => {
        return res.status(201).json(restaurants[0]);
      })
      .catch((error) => {
        return res.status(400).json({
          message: "There was an issue with the request",
          error,
        });
      });
  } else if (req.body.ranking_category === "hotel") {
    const {
      id,
      trip_id,
      listing_key,
      hotel_name,
      hotel_photo,
      rating,
      price,
      ranking_category,
    } = req.body;

    knex("hotels")
      .insert({
        id,
        trip_id,
        listing_key,
        hotel_name,
        hotel_photo,
        rating,
        price,
        ranking_category,
      })
      .then((hotels) => {
        return res.status(201).json(hotels[0]);
      })
      .catch((error) => {
        return res.status(400).json({
          message: "There was an issue with the request",
          error,
        });
      });
  } else {
    const {
      id,
      trip_id,
      attraction_name,
      attraction_address,
      attraction_website,
      attraction_phone,
      attraction_photo,
    } = req.body;

    knex("attractions")
      .insert({
        id,
        trip_id,
        attraction_name,
        attraction_address,
        attraction_website,
        attraction_phone,
        attraction_photo,
      })
      .then((attractions) => {
        return res.status(201).json(attractions[0]);
      })
      .catch((error) => {
        return res.status(400).json({
          message: "There was an issue with the request",
          error,
        });
      });
  }
};

exports.createTrip = (req, res) => {
  const { id, trip_name, user_id } = req.body;

  if (!id || !trip_name || !user_id) {
    return res.status(400).json({
      message: "Missing one or more required fields",
    });
  }

  knex("trips")
    .insert({
      id,
      trip_name,
      user_id,
    })
    .then((trips) => {
      return res.status(201).json(trips[0]);
    })
    .catch((error) => {
      return res.status(400).json({
        message: "There was an issue with the request",
        error,
      });
    });
};
