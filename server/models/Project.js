import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  problemStatement: { type: String },
  bornFromGrievance: { type: Boolean, default: false },
  originalGrievance: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  rolesNeeded: [{ type: String }],
  tags: [{ type: String }],
  category: {
    type: String,
    enum: ["Tech", "Design", "Social", "Non-tech", "Research"],
    required: true
  },
  movementDemand: {
    type: String,
    enum: [
      null,
      "JobsThatExist",
      "PublicEducation",
      "HealthForAll",
      "CleanBharat",
      "DignityBuild"
    ],
    default: null
  },
  isMovementBuild: { type: Boolean, default: false },
  mode: {
    type: String,
    enum: ["Regular", "Scramble"],
    default: "Regular"
  },
  scrambleEndsAt: { type: Date },
  status: {
    type: String,
    enum: ["Open", "In Progress", "Shipped", "Archived"],
    default: "Open"
  },
  state: { type: String },
  languages: [{ type: String }],
  mediaUrl: { type: String },
  githubUrl: { type: String },
  liveUrl: { type: String },
  joinRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  frassGrantReceived: { type: Number, default: 0 },
  approvalStatus: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
  createdAt: { type: Date, default: Date.now }
});

const Project = mongoose.model("Project", ProjectSchema);
export default Project;
