import MoultDeal from "../models/MoultDeal.js";
import User from "../models/User.js";

// Propose a new skill barter deal
export const createProposal = async (req, res) => {
  try {
    const { recipientId, senderOfferedSkill, recipientOfferedSkill, message } = req.body;
    
    if (!recipientId || !senderOfferedSkill || !recipientOfferedSkill) {
      return res.status(400).json({ message: "Missing required deal details." });
    }

    if (recipientId === req.user._id.toString()) {
      return res.status(400).json({ message: "You cannot barter skills with yourself." });
    }

    const recipientUser = await User.findById(recipientId);
    if (!recipientUser) {
      return res.status(404).json({ message: "Recipient user not found." });
    }

    // Defensive check: prevent duplicate pending/active proposals for identical trades between same users
    const existing = await MoultDeal.findOne({
      sender: req.user._id,
      recipient: recipientId,
      senderOfferedSkill,
      recipientOfferedSkill,
      status: { $in: ["proposed", "accepted"] }
    });

    if (existing) {
      return res.status(400).json({ message: "You already have an identical active proposal pending with this user." });
    }

    const deal = new MoultDeal({
      sender: req.user._id,
      recipient: recipientId,
      senderOfferedSkill,
      recipientOfferedSkill,
      message
    });

    const savedDeal = await deal.save();
    const populated = await MoultDeal.findById(savedDeal._id)
      .populate("sender", "alias rank state avatar colonyPoints")
      .populate("recipient", "alias rank state avatar colonyPoints");

    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch incoming & outgoing deals for the logged-in user
export const getDeals = async (req, res) => {
  try {
    const userId = req.user._id;
    const deals = await MoultDeal.find({
      $or: [{ sender: userId }, { recipient: userId }]
    })
      .populate("sender", "alias rank state avatar colonyPoints")
      .populate("recipient", "alias rank state avatar colonyPoints")
      .sort({ updatedAt: -1 });

    res.json(deals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Accept a barter proposal (recipient only)
export const acceptProposal = async (req, res) => {
  try {
    const { id } = req.params;
    const deal = await MoultDeal.findById(id);

    if (!deal) {
      return res.status(404).json({ message: "Moult deal not found." });
    }

    if (deal.recipient.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You are not authorized to accept this deal." });
    }

    if (deal.status !== "proposed") {
      return res.status(400).json({ message: "Deal is not in proposed state." });
    }

    deal.status = "accepted";
    await deal.save();

    const populated = await MoultDeal.findById(deal._id)
      .populate("sender", "alias rank state avatar colonyPoints")
      .populate("recipient", "alias rank state avatar colonyPoints");

    res.json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Decline a barter proposal (recipient only)
export const declineProposal = async (req, res) => {
  try {
    const { id } = req.params;
    const deal = await MoultDeal.findById(id);

    if (!deal) {
      return res.status(404).json({ message: "Moult deal not found." });
    }

    if (deal.recipient.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You are not authorized to decline this deal." });
    }

    if (deal.status !== "proposed") {
      return res.status(400).json({ message: "Deal is not in proposed state." });
    }

    deal.status = "declined";
    await deal.save();

    const populated = await MoultDeal.findById(deal._id)
      .populate("sender", "alias rank state avatar colonyPoints")
      .populate("recipient", "alias rank state avatar colonyPoints");

    res.json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Confirm completion of a barter deal (dual-consent completion + points award)
export const confirmDeal = async (req, res) => {
  try {
    const { id } = req.params;
    const deal = await MoultDeal.findById(id);

    if (!deal) {
      return res.status(404).json({ message: "Moult deal not found." });
    }

    const userIdStr = req.user._id.toString();
    const isSender = deal.sender.toString() === userIdStr;
    const isRecipient = deal.recipient.toString() === userIdStr;

    if (!isSender && !isRecipient) {
      return res.status(403).json({ message: "You are not authorized to confirm this deal." });
    }

    if (deal.status !== "accepted") {
      return res.status(400).json({ message: "Swaps must be accepted before they can be confirmed completed." });
    }

    if (isSender) {
      deal.senderConfirmed = true;
    } else {
      deal.recipientConfirmed = true;
    }

    // Dual-consent completion logic
    if (deal.senderConfirmed && deal.recipientConfirmed) {
      deal.status = "completed";

      // Award +100 colonyPoints and increment swapsCompleted for both participants
      await User.findByIdAndUpdate(deal.sender, {
        $inc: { colonyPoints: 100, swapsCompleted: 1 }
      });
      await User.findByIdAndUpdate(deal.recipient, {
        $inc: { colonyPoints: 100, swapsCompleted: 1 }
      });
    }

    await deal.save();

    const populated = await MoultDeal.findById(deal._id)
      .populate("sender", "alias rank state avatar colonyPoints")
      .populate("recipient", "alias rank state avatar colonyPoints");

    res.json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
