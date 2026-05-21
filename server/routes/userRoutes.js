import express from "express";
import { getUserExoResume, getLeaderboard } from "../controllers/userController.js";

const router = express.Router();
router.get("/leaderboard", getLeaderboard);
router.get("/:id/exoresume", getUserExoResume);
export default router;
