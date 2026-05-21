import mongoose from "mongoose";

const SkillSwapSchema = new mongoose.Schema({
  offeredBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  offering: { type: String, required: true },
  wantingIn: { type: String, required: true },
  availability: {
    type: String,
    enum: ["Weekends only", "Evenings IST", "Flexible"],
    default: "Flexible"
  },
  status: {
    type: String,
    enum: ["Open", "Matched", "Completed"],
    default: "Open"
  },
  matchedWith: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now }
});

const SkillSwap = mongoose.model("SkillSwap", SkillSwapSchema);
export default SkillSwap;
