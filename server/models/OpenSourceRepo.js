import mongoose from "mongoose";

const osRepoSchema = new mongoose.Schema({
  repoName: { type: String, required: true },
  repoUrl: { type: String, required: true },
  description: { type: String, required: true },
  techStack: [{ type: String }],
  difficulty: { type: String, enum: ["Beginner Friendly", "Intermediate", "Advanced"], default: "Beginner Friendly" },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, enum: ["Active", "Archived"], default: "Active" },
  approvalStatus: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" }
}, { timestamps: true });

export default mongoose.model("OpenSourceRepo", osRepoSchema);
