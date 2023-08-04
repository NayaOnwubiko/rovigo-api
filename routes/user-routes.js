import express from "express";
import { deleteUser, getUser } from "../controllers/usersController";
import { verifyToken } from "../middleware/authorize.js";

const router = express.Router();

router.delete("/:id", verifyToken, deleteUser);
router.get("/:id", verifyToken, getUser);

export default router;
