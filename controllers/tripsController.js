const knex = require('knex')(require('../knexfile'));
require('dotenv').config();

//configure the trips route to get data from the trips table that correspond to the user Id

exports.getAllTrips = async (req, res) => {
    await knex("trips")
          .where({ user_id: req.userId })
          .then((trips) => {
            if(trips.length === 0) {
                return res.status(404).json({
                    message: "Unable to find trips"
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

exports.createTrip = (req, res) => {
    if (
        !req.body.trip_name
    ) {
        return res
               .status(400)
               .json({
                    message: "Missing one or more required fields"
               });
    }

    const { id, trip_name, user_id } = req.body;
    
    console.log(req.body);
    knex("trips")
        .where({ user_id: req.body.userId })
        .insert({
            id,
            trip_name,
            user_id
        })
        .then(trips => {
            return res.status(201).json(trips[0]);
        })
        .catch(error => {
            return res.status(400).json({
                message: "There was an issue with the request",
                error
            })
        })
};