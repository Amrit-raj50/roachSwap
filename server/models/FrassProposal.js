import mongoose from "mongoose";

const FrassProposalSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  proposedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amountRequested: { type: Number, required: true },
  purpose: { type: String, required: true },
  votes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  voteCount: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ["Voting", "Approved", "Rejected", "Funded"],
    default: "Voting"
  },
  votingEndsAt: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

const FrassProposal = mongoose.model("FrassProposal", FrassProposalSchema);
export default FrassProposal;
