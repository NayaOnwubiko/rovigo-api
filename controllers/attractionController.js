import Attraction from "../models/attraction.model.js";
import createError from "../utils/createError.js";

export const createAttraction = async (req, res, next) => {
  const newAttraction = new Attraction({
    tripId: req.tripId,
    ...req.body,
  });

  try {
    const savedAttraction = await newAttraction.save();
    res.status(201).json(savedAttraction);
  } catch (err) {
    next(err);
  }
};

export const getAttractions = async (req, res, next) => {
  try {
    const attractions = await Attraction.find({ tripId: req.params.tripId });
    res.status(200).send(attractions);
  } catch (err) {
    next(err);
  }
};
