import express from "express";
import {
  createAttraction,
  getAttractions,
} from "../controllers/attractionController.js";
import { verifyToken } from "../middleware/authorize.js";

const router = express.Router();

router.post("/", verifyToken, createAttraction);
router.get("/:tripId", verifyToken, getAttractions);

export default router;
