import express from "express";
import { getSkills, createSkillSwap } from "../controllers/skillController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
  .get(getSkills)
  .post(protect, createSkillSwap);

export default router;
