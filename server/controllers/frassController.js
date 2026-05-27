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

export const voteOnProposal = async (req, res) => {
  try {
    const proposal = await FrassProposal.findById(req.params.id);
    if (!proposal) return res.status(404).json({ message: "Proposal not found" });

    if (proposal.votes.includes(req.user._id)) {
      return res.status(400).json({ message: "You have already voted on this proposal" });
    }

    proposal.votes.push(req.user._id);
    proposal.voteCount = proposal.votes.length;
    
    await proposal.save();
    res.json(proposal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
