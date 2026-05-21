import express from "express";
import { getRants, getRandomTickerRants, createRant, upvoteRant } from "../controllers/rantController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
  .get(getRants)
  .post(protect, createRant);

router.get("/ticker", getRandomTickerRants);
router.post("/:id/upvote", protect, upvoteRant);

export default router;
