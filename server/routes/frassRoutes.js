import express from "express";
import { getProposals, createProposal, voteOnProposal } from "../controllers/frassController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
  .get(getProposals)
  .post(protect, createProposal);

router.post("/:id/vote", protect, voteOnProposal);

export default router;
