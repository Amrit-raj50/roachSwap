import express from "express";
import { 
  createProposal, 
  getDeals, 
  acceptProposal, 
  declineProposal, 
  confirmDeal 
} from "../controllers/moultController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// All barter deal routes require authentication
router.use(protect);

router.route("/deals")
  .post(createProposal)
  .get(getDeals);

router.patch("/deals/:id/accept", acceptProposal);
router.patch("/deals/:id/decline", declineProposal);
router.patch("/deals/:id/confirm", confirmDeal);

export default router;
