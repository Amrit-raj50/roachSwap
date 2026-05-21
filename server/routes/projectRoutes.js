import express from "express";
import { getProjects, createProject, getProjectById, joinProject, getPendingProjects, approveProject, rejectProject } from "../controllers/projectController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
  .get(getProjects)
  .post(protect, createProject);

router.get("/pending", protect, adminOnly, getPendingProjects);

router.route("/:id")
  .get(getProjectById);

router.post("/:id/join", protect, joinProject);
router.put("/:id/approve", protect, adminOnly, approveProject);
router.put("/:id/reject", protect, adminOnly, rejectProject);

export default router;
