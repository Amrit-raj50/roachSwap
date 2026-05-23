import express from "express";
import { 
  getMentors, 
  createSession, 
  createBooking, 
  getBookings, 
  updateBookingStatus 
} from "../controllers/hivemindController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/mentors", getMentors);
router.post("/sessions", protect, createSession);

// Mentorship Booking Routes
router.post("/bookings", protect, createBooking);
router.get("/bookings", protect, getBookings);
router.put("/bookings/:id/status", protect, updateBookingStatus);

export default router;

