import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  alias: { type: String, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  state: { type: String, required: true },
  bio: { type: String, maxlength: 280 },
  avatar: { type: String },
  skills: [{ type: String }],
  c4iMemberId: { type: String, default: null },
  isC4IVerified: { type: Boolean, default: false },
  c4iJoinedAt: { type: Date },
  currentStatus: {
    type: String,
    enum: [
      "Unemployed",
      "Student",
      "Underpaid",
      "Exam Warrior",
      "Corporate Cockroach",
      "Freelancer in Denial",
      "Other Tragedy"
    ],
    default: "Unemployed"
  },
  shellShieldActive: { type: Boolean, default: false },
  colonyPoints: { type: Number, default: 0 },
  rank: {
    type: String,
    enum: ["Hatchling", "Forager", "Tunnel Digger", "Mega Roach", "Colony Queen"],
    default: "Hatchling"
  },
  projectsShipped: { type: Number, default: 0 },
  swapsCompleted: { type: Number, default: 0 },
  hivemindSessionsAttended: { type: Number, default: 0 },
  scramblesCompleted: { type: Number, default: 0 },
  isMentor: { type: Boolean, default: false },
  mentorExpertise: [{ type: String }],
  nextMentorSlot: { type: Date },
  grievanceFiled: { type: String },
  grievanceCity: { type: String },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model("User", UserSchema);
export default User;
