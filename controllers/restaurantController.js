import Restaurant from "../models/restaurant.model.js";
import createError from "../utils/createError.js";

export const createRestaurant = async (req, res, next) => {
  const newRestaurant = new Restaurant({
    tripId: req.tripId,
    ...req.body,
  });

  try {
    const savedRestaurant = await newRestaurant.save();
    res.status(201).json(savedRestaurant);
  } catch (err) {
    next(err);
  }
};

export const getRestaurants = async (req, res, next) => {
  try {
    const restaurants = await Restaurant.find({ tripId: req.params.tripId });
    res.status(200).send(restaurants);
  } catch (err) {
    next(err);
  }
};
