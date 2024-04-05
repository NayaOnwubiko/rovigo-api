import Restaurant from "../models/restaurant.model.js";
import createError from "../utils/createError.js";

export const createRestaurant = async (req, res, next) => {
  const newRestaurant = new Restaurant({
    tripId: req.body.tripId,
    name: req.body.name,
    phone: req.body.phone,
    website: req.body.website,
    photo: req.body.photo.images.large.url, // Extract the URL from the object
    address: req.body.address,
    rankingCategory: req.body.ranking_category,
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
