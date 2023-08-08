import express from "express";
import {
  createTrip,
  deleteTrip,
  getTrip,
  getUserTrips,
} from "../controllers/tripsController.js";
import { verifyToken } from "../middleware/authorize.js";

const router = express.Router();

router.post("/", verifyToken, createTrip);
router.delete("/:id", verifyToken, deleteTrip);
router.get("/:id", getTrip);
router.get("/", verifyToken, getUserTrips);

export default router;
