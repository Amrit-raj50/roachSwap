import express from "express";
import { getMentors, createSession } from "../controllers/hivemindController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/mentors", getMentors);
router.post("/sessions", protect, createSession);

export default router;
