import Hotel from "../models/hotel.model.js";
import createError from "../utils/createError.js";

export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel({
    tripId: req.tripId,
    ...req.body,
  });

  try {
    const savedHotel = await newHotel.save();
    res.status(201).json(savedHotel);
  } catch (err) {
    next(err);
  }
};

export const getHotels = async (req, res, next) => {
  try {
    const hotels = await Hotel.find({ tripId: req.params.tripId });
    res.status(200).send(hotels);
  } catch (err) {
    next(err);
  }
};
