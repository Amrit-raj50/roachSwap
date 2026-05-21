import mongoose from "mongoose";

const HiveMindSessionSchema = new mongoose.Schema({
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  mentee: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  topic: { type: String },
  scheduledAt: { type: Date, required: true },
  duration: { type: Number, default: 30 },
  status: {
    type: String,
    enum: ["Available", "Booked", "Completed", "Cancelled"],
    default: "Available"
  },
  isPublicSession: { type: Boolean, default: true },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const HiveMindSession = mongoose.model("HiveMindSession", HiveMindSessionSchema);
export default HiveMindSession;
