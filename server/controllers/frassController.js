import FrassProposal from "../models/FrassProposal.js";

export const getProposals = async (req, res) => {
  try {
    const proposals = await FrassProposal.find({ status: "Voting" }).populate("proposedBy", "alias rank");
    res.json(proposals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProposal = async (req, res) => {
  try {
    const proposal = new FrassProposal({
      ...req.body,
      proposedBy: req.user._id
    });
    const createdProposal = await proposal.save();
    res.status(201).json(createdProposal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
