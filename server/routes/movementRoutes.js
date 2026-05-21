import express from "express";
import { getMovementStats } from "../controllers/movementController.js";

const router = express.Router();
router.get("/stats", getMovementStats);
export default router;
