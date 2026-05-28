import express from "express";
import { getProposals, createProposal } from "../controllers/frassController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
  .get(getProposals)
  .post(protect, createProposal);

export default router;
