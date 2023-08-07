import express from "express";
import {
  createRestaurant,
  getRestaurants,
} from "../controllers/restaurantController.js";
import { verifyToken } from "../middleware/authorize.js";

const router = express.Router();

router.post("/", verifyToken, createRestaurant);
router.get("/:tripId", verifyToken, getRestaurants);

export default router;
