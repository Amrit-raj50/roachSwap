import mongoose from "mongoose";

const FeedEventSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: [
      "user_joined", "project_posted", "member_joined_project",
      "skill_swapped", "scramble_started", "hivemind_opened",
      "frass_funded", "project_shipped", "rank_earned",
      "c4i_member_joined",
      "movement_build_posted"
    ],
    required: true
  },
  actor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  actorAlias: { type: String },
  message: { type: String, required: true },
  relatedProject: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  state: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const FeedEvent = mongoose.model("FeedEvent", FeedEventSchema);
export default FeedEvent;
