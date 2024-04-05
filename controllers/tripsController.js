import Trip from "../models/trips.model.js";
import createError from "../utils/createError.js";

export const createTrip = async (req, res, next) => {
  const newTrip = new Trip({
    userId: req.userId,
    ...req.body,
  });

  try {
    await newTrip.save();

    const updatedTrips = await Trip.find({ userId: req.userId });

    res.status(201).json(updatedTrips);
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
    const userId = req.userId;
    const trips = await Trip.find({ userId }).sort({ createdAt: -1 }); // Sort by descending order

    if (!trips) return next(createError(404, "Trips Not Found"));
    res.status(200).json(trips);
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
