import mongoose from "mongoose";

const MentorshipBookingSchema = new mongoose.Schema({
  mentor: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  bookedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  dateTime: { 
    type: Date, 
    required: true 
  },
  note: { 
    type: String, 
    required: true,
    maxlength: 500 
  },
  topics: [{ 
    type: String 
  }],
  status: {
    type: String,
    enum: ["pending", "accepted", "completed", "cancelled"],
    default: "pending"
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Indexes for high-performance querying
MentorshipBookingSchema.index({ mentor: 1, status: 1 });
MentorshipBookingSchema.index({ bookedBy: 1, status: 1 });

const MentorshipBooking = mongoose.model("MentorshipBooking", MentorshipBookingSchema);
export default MentorshipBooking;
