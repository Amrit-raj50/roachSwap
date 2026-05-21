import mongoose from "mongoose";

const ColonyPointsSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  action: {
    type: String,
    enum: [
      "project_created", "project_joined", "project_shipped",
      "skill_swapped", "scramble_completed", "hivemind_attended",
      "hivemind_hosted", "frass_voted", "frass_funded",
      "c4i_member_bonus",
      "movement_build_bonus"
    ]
  },
  points: { type: Number, required: true },
  reference: { type: mongoose.Schema.Types.ObjectId },
  createdAt: { type: Date, default: Date.now }
});

const ColonyPoints = mongoose.model("ColonyPoints", ColonyPointsSchema);
export default ColonyPoints;
