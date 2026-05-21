import express from "express";
import { getRepos, addRepo, getPendingRepos, approveRepo, rejectRepo } from "../controllers/osRepoController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
  .get(getRepos)
  .post(protect, addRepo);

router.get("/pending", protect, adminOnly, getPendingRepos);
router.put("/:id/approve", protect, adminOnly, approveRepo);
router.put("/:id/reject", protect, adminOnly, rejectRepo);

export default router;
