import express from "express";
import { createHotel, getHotels } from "../controllers/hotelController.js";
import { verifyToken } from "../middleware/authorize.js";

const router = express.Router();

router.post("/", verifyToken, createHotel);
router.get("/:tripId", verifyToken, getHotels);

export default router;
