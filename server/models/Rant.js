import mongoose from "mongoose";

const rantSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  company: { type: String }, // Optional, for rejections
  type: { type: String, enum: ["Rant", "Rejection"], required: true },
  upvotes: { type: Number, default: 0 },
  upvotedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Rant", rantSchema);
