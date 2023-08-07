import Trip from "../models/trips.model.js";
import createError from "../utils/createError.js";

export const createTrip = async (req, res, next) => {
  const newTrip = new Trip({
    userId: req.userId,
    ...req.body,
  });

  try {
    const savedTrip = await newTrip.save();
    res.status(201).json(savedTrip);
  } catch (err) {
    next(err);
  }
};

export const deleteTrip = async (req, res, next) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (trip.userId !== req.userId)
      return next(createError(403, "You can only delete your trips!"));

    await Trip.findByIdAndDelete(req.params.id);
    res.status(200).send("Trip has been deleted");
  } catch (err) {
    next(err);
  }
};

export const getUserTrips = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const trips = await Trip.find({ userId });

    if (!trips) return next(createError(404, "Trips Not Found"));
    res.status(200).send(trips);
  } catch (err) {
    next(err);
  }
};

export const getTrip = async (req, res, next) => {
  try {
    const trip = await Trip.findOne({ id: req.params.id });

    if (!trip) return next(createError(404, "Trip Not Found"));
    res.status(200).send(trip);
  } catch (err) {
    next(err);
  }
};
