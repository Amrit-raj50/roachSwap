import express from "express";
import { registerUser, loginUser, getMe, toggleShellShield } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);
router.patch("/shell-shield", protect, toggleShellShield);

export default router;
